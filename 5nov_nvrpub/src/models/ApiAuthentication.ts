import { query } from '@/lib/db';

export interface ApiAuthentication {
  id?: number;
  username: string;
  token_value: string;
  auth_method: 'IP-Based' | 'None';
  status: 'Active' | 'Inactive';
  created_at?: Date;
  updated_at?: Date;
}

export class ApiAuthenticationRepository {
  private static readonly TABLE_NAME = 'api_authentications';

  static async findAll(filters: {
    search?: string;
    status?: 'Active' | 'Inactive';
    startsWith?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<ApiAuthentication[]> {
    let sql = `SELECT * FROM ${this.TABLE_NAME} WHERE 1=1`;
    const params: any[] = [];

    if (filters.search) {
      sql += ' AND username LIKE ?';
      params.push(`%${filters.search}%`);
    }

    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.startsWith) {
      sql += ' AND username LIKE ?';
      params.push(`${filters.startsWith}%`);
    }

    sql += ' ORDER BY username ASC';

    // LIMIT and OFFSET cannot be parameters in MySQL prepared statements
    // They must be directly interpolated into the SQL string (but validated as integers for safety)
    if (filters.limit !== undefined) {
      const limit = Math.max(1, parseInt(String(filters.limit), 10));
      if (isNaN(limit)) {
        throw new Error('Invalid limit value');
      }
      sql += ` LIMIT ${limit}`;

      if (filters.offset !== undefined) {
        const offset = Math.max(0, parseInt(String(filters.offset), 10));
        if (isNaN(offset)) {
          throw new Error('Invalid offset value');
        }
        sql += ` OFFSET ${offset}`;
      }
    }

    return query<ApiAuthentication[]>(sql, params);
  }

  static async findById(id: number): Promise<ApiAuthentication | null> {
    const results = await query<ApiAuthentication[]>(
      `SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`,
      [id]
    );
    return (Array.isArray(results) && results.length > 0) ? results[0] : null;
  }

  static async create(data: Omit<ApiAuthentication, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const result = await query<any>(
      `INSERT INTO ${this.TABLE_NAME} (username, token_value, auth_method, status) VALUES (?, ?, ?, ?)`,
      [data.username, data.token_value, data.auth_method, data.status]
    );
    return (result as any).insertId || (result as any).insertid || 0;
  }

  static async update(id: number, data: Partial<Omit<ApiAuthentication, 'id' | 'created_at' | 'updated_at'>>): Promise<boolean> {
    const fields = [];
    const params: any[] = [];

    if (data.username !== undefined) {
      fields.push('username = ?');
      params.push(data.username);
    }
    if (data.token_value !== undefined) {
      fields.push('token_value = ?');
      params.push(data.token_value);
    }
    if (data.auth_method !== undefined) {
      fields.push('auth_method = ?');
      params.push(data.auth_method);
    }
    if (data.status !== undefined) {
      fields.push('status = ?');
      params.push(data.status);
    }

    if (fields.length === 0) {
      return false;
    }

    params.push(id);
    const result = await query<any>(
      `UPDATE ${this.TABLE_NAME} SET ${fields.join(', ')} WHERE id = ?`,
      params
    );

    return ((result as any).affectedRows || (result as any).affectedrows || 0) > 0;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await query<any>(
      `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`,
      [id]
    );
    return ((result as any).affectedRows || (result as any).affectedrows || 0) > 0;
  }

  static async count(filters: { status?: 'Active' | 'Inactive' } = {}): Promise<number> {
    let sql = `SELECT COUNT(*) as count FROM ${this.TABLE_NAME}`;
    const params: any[] = [];

    if (filters.status) {
      sql += ' WHERE status = ?';
      params.push(filters.status);
    }

    const results = await query<{ count: number }[]>(sql, params);
    return (Array.isArray(results) && results.length > 0) ? results[0].count : 0;
  }
}
