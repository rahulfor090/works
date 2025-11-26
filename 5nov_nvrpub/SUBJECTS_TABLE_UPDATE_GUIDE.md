# Subject Categories Admin Page - Complete Update Guide

## ✅ What's Been Done

Successfully added the following fields to the Subject Categories admin dashboard:
1. **Slug** - URL-friendly version of subject name (auto-generated)
2. **Description** - Text area for detailed description
3. **Sort Order** - Number field to control display order
4. **Show on Homepage** - Toggle switch (0/1)
5. **Show in Slider** - Toggle switch (0/1)

## 📋 SQL Queries to Run

### Step 1: Update the `subjects` table structure

Run these SQL queries in your MySQL database:

```sql
-- Add slug column
ALTER TABLE subjects 
ADD COLUMN slug VARCHAR(255) NULL AFTER subject;

-- Add description column
ALTER TABLE subjects 
ADD COLUMN description TEXT NULL AFTER slug;

-- Add sort_order column
ALTER TABLE subjects 
ADD COLUMN sort_order INT DEFAULT 0 AFTER description;

-- Add is_homepage column (0 = not shown, 1 = shown on homepage)
ALTER TABLE subjects 
ADD COLUMN is_homepage TINYINT(1) DEFAULT 0 AFTER sort_order;

-- Add is_slider column (0 = not shown, 1 = shown in slider)
ALTER TABLE subjects 
ADD COLUMN is_slider TINYINT(1) DEFAULT 0 AFTER is_homepage;

-- Add index on slug for better performance
CREATE INDEX idx_slug ON subjects(slug);

-- Add index on is_homepage for filtering
CREATE INDEX idx_is_homepage ON subjects(is_homepage);
```

### Step 2: Generate slugs for existing records (OPTIONAL)

```sql
-- Auto-generate slugs from existing subject names
UPDATE subjects 
SET slug = LOWER(REPLACE(REPLACE(REPLACE(subject, ' ', '-'), '&', 'and'), ',', ''))
WHERE slug IS NULL OR slug = '';
```

### Step 3: Verify the changes

```sql
-- Check table structure
DESCRIBE subjects;

-- View sample data
SELECT * FROM subjects LIMIT 10;
```

## 📊 Updated Table Structure

After running the SQL queries, your `subjects` table will have:

| Field        | Type         | Description                              |
|--------------|--------------|------------------------------------------|
| id           | INT          | Primary key (auto-increment)             |
| subject      | VARCHAR(255) | Subject name                             |
| slug         | VARCHAR(255) | URL-friendly slug                        |
| description  | TEXT         | Subject description                      |
| sort_order   | INT          | Display order (lower numbers first)      |
| is_homepage  | TINYINT(1)   | Show on homepage (0=no, 1=yes)          |
| is_slider    | TINYINT(1)   | Show in slider (0=no, 1=yes)            |
| created_at   | DATETIME     | Creation timestamp                       |
| updated_at   | DATETIME     | Last update timestamp                    |

## 🎨 Admin Dashboard Features

### Form Fields:
1. **Subject Name** - Auto-generates slug on typing
2. **Slug** - Can be manually edited if needed
3. **Description** - Multi-line text area (3 rows)
4. **Sort Order** - Number input with helper text
5. **Show on Homepage** - Toggle switch
6. **Show in Slider** - Toggle switch

### Display Features:
- Subjects sorted by sort_order and name
- Homepage and Slider badges shown on each subject
- Summary count at the top: "On Homepage: X | In Slider: Y"
- Shows slug, sort order, description in list view
- Edit and Delete buttons for each subject

## 🔧 Code Changes Made

### Files Updated:

1. **`src/pages/admin/subjectcategories.tsx`**
   - Added all form fields
   - Auto-slug generation from name
   - Enhanced display with badges
   - Added switches for homepage/slider toggles

2. **`src/pages/api/subjectcategories/index.ts`**
   - Updated GET to return all new fields
   - Updated POST to save all fields
   - Added optional filtering by is_homepage

3. **`src/pages/api/subjectcategories/[id].ts`**
   - Updated GET to return all fields
   - Updated PUT to update all fields
   - Maintains DELETE functionality

## 🚀 How to Use

### After running the SQL queries:

1. Navigate to `/admin/subjectcategories` in your application
2. Create a new subject with all fields
3. The slug will auto-generate as you type the name
4. Toggle "Show on Homepage" and "Show in Slider" as needed
5. Set sort order (lower numbers appear first)
6. Save and see the subject with badges in the list

### API Endpoints:

**Get all subjects:**
```
GET /api/subjectcategories
```

**Get homepage subjects only:**
```
GET /api/subjectcategories?isHomepage=1
```

**Create new subject:**
```
POST /api/subjectcategories
Body: {
  "name": "Cardiology",
  "slug": "cardiology",
  "description": "Study of the heart",
  "sortOrder": 10,
  "isHomepage": 1,
  "isSlider": 1
}
```

**Update subject:**
```
PUT /api/subjectcategories/[id]
Body: {
  "name": "Updated Name",
  "slug": "updated-slug",
  "description": "Updated description",
  "sortOrder": 5,
  "isHomepage": 0,
  "isSlider": 1
}
```

**Delete subject:**
```
DELETE /api/subjectcategories/[id]
```

## ⚠️ Important Notes

1. **Run SQL queries first** - The code expects these columns to exist
2. **Slug is required** - Auto-generated but can be manually edited
3. **Sort Order** - Default is 0, lower numbers display first
4. **Boolean values** - Stored as 0 (false) or 1 (true) in database
5. **Existing data** - Won't break; new fields will be NULL/0 by default

## 🧪 Testing Checklist

- [ ] Run all SQL queries successfully
- [ ] Verify table structure with DESCRIBE
- [ ] Create new subject with all fields
- [ ] Edit existing subject
- [ ] Toggle homepage/slider switches
- [ ] Verify sort order works
- [ ] Check slug auto-generation
- [ ] Test delete functionality
- [ ] Verify API returns all fields
- [ ] Check homepage filter works

## 📝 Database Backup Reminder

Before running SQL queries, it's recommended to backup your database:

```bash
mysqldump -u your_username -p jaypeedigi subjects > subjects_backup.sql
```

To restore if needed:
```bash
mysql -u your_username -p jaypeedigi < subjects_backup.sql
```
