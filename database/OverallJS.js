// =====================================================
// DATABASE CONNECTION SETUP
// =====================================================

// config/databases.js
const knex = require('knex');

const databases = {
  auth: knex({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'auth_service_db',
      charset: 'utf8mb4'
    },
    pool: { min: 2, max: 10 },
    acquireConnectionTimeout: 10000
  }),

  content: knex({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'content_service_db',
      charset: 'utf8mb4'
    },
    pool: { min: 10, max: 50 }, // High traffic
    acquireConnectionTimeout: 10000
  }),

  commerce: knex({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'commerce_service_db',
      charset: 'utf8mb4'
    },
    pool: { min: 5, max: 30 }, // Transactional
    acquireConnectionTimeout: 10000
  }),

  institution: knex({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'institution_service_db',
      charset: 'utf8mb4'
    },
    pool: { min: 2, max: 15 },
    acquireConnectionTimeout: 10000
  }),

  analytics: knex({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'analytics_service_db',
      charset: 'utf8mb4'
    },
    pool: { min: 5, max: 20 }, // Batch processing
    acquireConnectionTimeout: 10000
  }),

  cms: knex({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'cms_service_db',
      charset: 'utf8mb4'
    },
    pool: { min: 2, max: 10 },
    acquireConnectionTimeout: 10000
  }),

  reference: knex({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'reference_service_db',
      charset: 'utf8mb4'
    },
    pool: { min: 2, max: 10 },
    acquireConnectionTimeout: 10000
  })
};

module.exports = databases;

// =====================================================
// SERVICE LAYER EXAMPLES
// =====================================================

// services/userService.js
const { auth } = require('../config/databases');

class UserService {
  async getUserById(userId) {
    return await auth('user')
      .where({ user_id: userId })
      .first();
  }

  async createUser(userData) {
    const [userId] = await auth('user').insert({
      username: userData.username,
      email: userData.email,
      password: userData.hashedPassword,
      first_name: userData.firstName,
      last_name: userData.lastName,
      created_by: userData.createdBy || 0,
      created_date: new Date()
    });
    
    return userId;
  }

  async getUserWithRoles(userId) {
    // Join across same database
    const result = await auth('user as u')
      .leftJoin('map_user_role as mur', 'u.user_id', 'mur.user_id')
      .leftJoin('role as r', 'mur.role_id', 'r.role_id')
      .where('u.user_id', userId)
      .select('u.*', 'r.role_name', 'r.role_code');
    
    if (!result.length) return null;
    
    // Group roles
    const user = result[0];
    user.roles = result.map(r => ({
      role_name: r.role_name,
      role_code: r.role_code
    })).filter(r => r.role_name);
    
    return user;
  }

  async authenticateUser(username, password) {
    const user = await auth('user')
      .where({ username })
      .where({ active: 'Y' })
      .where({ approved: 'Y' })
      .first();
    
    if (!user) return null;
    
    // Verify password (implement your hashing logic)
    const isValid = await this.verifyPassword(password, user.password);
    if (!isValid) return null;
    
    // Update last login
    await auth('user')
      .where({ user_id: user.user_id })
      .update({ date_last_login: new Date() });
    
    return user;
  }

  async verifyPassword(plain, hashed) {
    // Implement your password verification
    return true; // Placeholder
  }
}

module.exports = new UserService();

// =====================================================
// services/articleService.js
const { content } = require('../config/databases');

class ArticleService {
  async getArticleWithDetails(articleId) {
    // Get article with journal info using view
    const article = await content('article as a')
      .leftJoin('journal as j', 'a.journal_id', 'j.journal_id')
      .leftJoin('issue as i', 'a.issue_id', 'i.issue_id')
      .leftJoin('volume as v', 'a.volume_id', 'v.volume_id')
      .where('a.article_id', articleId)
      .select(
        'a.*',
        'j.journal_title',
        'j.journal_code',
        'i.number as issue_number',
        'v.volume_no'
      )
      .first();
    
    if (!article) return null;
    
    // Get authors
    article.authors = await content('map_article_author as maa')
      .join('author as au', 'maa.author_id', 'au.author_id')
      .where('maa.article_id', articleId)
      .orderBy('maa.seq_no', 'asc')
      .select('au.*', 'maa.corresp_author', 'maa.seq_no');
    
    // Get created by user info using view
    const creator = await content('v_user')
      .where({ user_id: article.created_by })
      .first();
    
    article.created_by_info = creator;
    
    return article;
  }

  async searchArticles(searchTerm, filters = {}) {
    let query = content('article as a')
      .join('journal as j', 'a.journal_id', 'j.journal_id')
      .where('a.display_status', '1');
    
    // Full-text search
    if (searchTerm) {
      query = query.whereRaw(
        'MATCH(a.title, a.abstract) AGAINST(? IN NATURAL LANGUAGE MODE)',
        [searchTerm]
      );
    }
    
    // Apply filters
    if (filters.journalId) {
      query = query.where('a.journal_id', filters.journalId);
    }
    
    if (filters.dateFrom) {
      query = query.where('a.online_publish_date', '>=', filters.dateFrom);
    }
    
    if (filters.dateTo) {
      query = query.where('a.online_publish_date', '<=', filters.dateTo);
    }
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const offset = (page - 1) * limit;
    
    const [results, totalCount] = await Promise.all([
      query
        .select('a.*', 'j.journal_title')
        .limit(limit)
        .offset(offset),
      query.clone().count('a.article_id as count').first()
    ]);
    
    return {
      articles: results,
      total: totalCount.count,
      page,
      limit,
      totalPages: Math.ceil(totalCount.count / limit)
    };
  }

  async incrementArticleView(articleId) {
    await content('article')
      .where({ article_id: articleId })
      .increment('total_view', 1);
  }
}

module.exports = new ArticleService();

// =====================================================
// services/orderService.js
const { commerce, auth, content } = require('../config/databases');

class OrderService {
  async createOrder(orderData) {
    const trx = await commerce.transaction();
    
    try {
      // Insert order
      const [orderId] = await trx('customer_order').insert({
        user_id: orderData.userId,
        order_number: this.generateOrderNumber(),
        transaction_status: 'INITIATED',
        currency_id: orderData.currencyId,
        amount_paid: orderData.amount,
        purchase_type: orderData.purchaseType,
        order_date: new Date()
      });
      
      // Insert order items (if multiple artifacts)
      if (orderData.items && orderData.items.length > 0) {
        const items = orderData.items.map(item => ({
          user_id: orderData.userId,
          artifact_type: item.artifactType,
          artifact_id: item.artifactId,
          order_id: orderId,
          currency_id: orderData.currencyId,
          price: item.price,
          subscription_category_id: item.categoryId,
          license_start_date: new Date(),
          created_by: orderData.userId,
          updated_by: orderData.userId
        }));
        
        await trx('user_artifact_purchase').insert(items);
      }
      
      await trx.commit();
      return orderId;
      
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async getOrderWithDetails(orderId) {
    // Get order
    const order = await commerce('customer_order as co')
      .where('co.order_id', orderId)
      .first();
    
    if (!order) return null;
    
    // Get user info using view
    const user = await commerce('v_user')
      .where({ user_id: order.user_id })
      .first();
    
    // Get purchased items
    const items = await commerce('user_artifact_purchase')
      .where({ order_id: orderId });
    
    // Enrich items with content details
    for (let item of items) {
      if (item.artifact_type === 'Article') {
        const article = await content('article')
          .where({ article_id: item.artifact_id })
          .select('article_id', 'title', 'article_doi')
          .first();
        item.artifact_details = article;
      } else if (item.artifact_type === 'Book') {
        const book = await content('book')
          .where({ book_id: item.artifact_id })
          .select('book_id', 'book_title', 'isbn')
          .first();
        item.artifact_details = book;
      }
    }
    
    return {
      ...order,
      user,
      items
    };
  }

  generateOrderNumber() {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = new OrderService();

// =====================================================
// services/analyticsService.js
const { analytics, auth, content } = require('../config/databases');

class AnalyticsService {
  async trackPageView(trackingData) {
    const table = this.getTrackingTable('page_tracking', new Date());
    
    await analytics(table).insert({
      publisher_id: trackingData.publisherId,
      user_type: trackingData.userType,
      user_id: trackingData.userId || 0,
      session_id: trackingData.sessionId,
      remote_ip: trackingData.ip,
      remote_ip_inet: this.ipToBuffer(trackingData.ip),
      referer_url: trackingData.referer,
      page_type: trackingData.pageType,
      page_id: trackingData.pageId,
      access_allow: trackingData.accessAllow ? '1' : '0',
      created_date: new Date()
    });
  }

  async getArticleStatistics(articleId, dateFrom, dateTo) {
    // Get views from page tracking
    const tables = this.getTrackingTables('page_tracking', dateFrom, dateTo);
    
    let totalViews = 0;
    for (const table of tables) {
      const result = await analytics(table)
        .where({ page_type: 'Article', page_id: articleId })
        .whereBetween('created_date', [dateFrom, dateTo])
        .count('* as views')
        .first();
      
      totalViews += result.views;
    }
    
    // Get downloads
    const downloadTables = this.getTrackingTables('download_tracking', dateFrom, dateTo);
    let totalDownloads = 0;
    
    for (const table of downloadTables) {
      const result = await analytics(table)
        .where({ download_type: 'Article', download_id: articleId })
        .whereBetween('created_date', [dateFrom, dateTo])
        .count('* as downloads')
        .first();
      
      totalDownloads += result.downloads;
    }
    
    return {
      article_id: articleId,
      total_views: totalViews,
      total_downloads: totalDownloads,
      date_range: { from: dateFrom, to: dateTo }
    };
  }

  getTrackingTable(prefix, date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${prefix}_${month}_${year}`;
  }

  getTrackingTables(prefix, dateFrom, dateTo) {
    // Generate list of tables between dates
    const tables = [];
    const current = new Date(dateFrom);
    
    while (current <= dateTo) {
      tables.push(this.getTrackingTable(prefix, current));
      current.setMonth(current.getMonth() + 1);
    }
    
    return tables;
  }

  ipToBuffer(ip) {
    // Convert IP to binary for storage
    return Buffer.from(ip.split('.').map(n => parseInt(n)));
  }
}

module.exports = new AnalyticsService();

// =====================================================
// API ROUTE EXAMPLES
// =====================================================

// routes/articles.js
const express = require('express');
const router = express.Router();
const articleService = require('../services/articleService');
const analyticsService = require('../services/analyticsService');

// Get article details
router.get('/articles/:id', async (req, res) => {
  try {
    const article = await articleService.getArticleWithDetails(req.params.id);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    // Track page view
    await analyticsService.trackPageView({
      publisherId: article.publisher_id,
      userType: req.user ? 'Individual' : 'Anonymous',
      userId: req.user?.user_id,
      sessionId: req.sessionID,
      ip: req.ip,
      referer: req.get('Referer'),
      pageType: 'Article',
      pageId: article.article_id,
      accessAllow: true
    });
    
    // Increment view count
    await articleService.incrementArticleView(article.article_id);
    
    res.json({ article });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search articles
router.get('/articles/search', async (req, res) => {
  try {
    const { q, journal_id, date_from, date_to, page, limit } = req.query;
    
    const results = await articleService.searchArticles(q, {
      journalId: journal_id,
      dateFrom: date_from,
      dateTo: date_to,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20
    });
    
    res.json(results);
  } catch (error) {
    console.error('Error searching articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

// routes/orders.js
const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');
const authMiddleware = require('../middleware/auth');

// Create order (requires authentication)
router.post('/orders', authMiddleware, async (req, res) => {
  try {
    const orderData = {
      userId: req.user.user_id,
      currencyId: req.body.currency_id,
      amount: req.body.amount,
      purchaseType: req.body.purchase_type,
      items: req.body.items
    };
    
    const orderId = await orderService.createOrder(orderData);
    
    res.status(201).json({ 
      order_id: orderId,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get order details
router.get('/orders/:id', authMiddleware, async (req, res) => {
  try {
    const order = await orderService.getOrderWithDetails(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if user owns this order
    if (order.user_id !== req.user.user_id && !req.user.is_admin) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    res.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

// =====================================================
// CACHING LAYER (Redis)
// =====================================================

const Redis = require('ioredis');
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

class CacheService {
  async get(key) {
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async set(key, value, ttl = 3600) {
    await redis.setex(key, ttl, JSON.stringify(value));
  }

  async del(key) {
    await redis.del(key);
  }

  async invalidatePattern(pattern) {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}

module.exports = new CacheService();

// Example usage with caching
class CachedArticleService extends ArticleService {
  async getArticleWithDetails(articleId) {
    const cacheKey = `article:${articleId}`;
    
    // Try cache first
    let article = await CacheService.get(cacheKey);
    if (article) return article;
    
    // Fetch from database
    article = await super.getArticleWithDetails(articleId);
    
    // Cache for 1 hour
    if (article) {
      await CacheService.set(cacheKey, article, 3600);
    }
    
    return article;
  }
}

// =====================================================
// HEALTH CHECK ENDPOINT
// =====================================================

router.get('/health', async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    databases: {}
  };
  
  try {
    // Check each database
    await auth.raw('SELECT 1');
    health.databases.auth = 'ok';
  } catch (e) {
    health.databases.auth = 'error';
    health.status = 'error';
  }
  
  try {
    await content.raw('SELECT 1');
    health.databases.content = 'ok';
  } catch (e) {
    health.databases.content = 'error';
    health.status = 'error';
  }
  
  try {
    await commerce.raw('SELECT 1');
    health.databases.commerce = 'ok';
  } catch (e) {
    health.databases.commerce = 'error';
    health.status = 'error';
  }
  
  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
});

module.exports = router;