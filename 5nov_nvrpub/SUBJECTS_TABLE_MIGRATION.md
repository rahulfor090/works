# Subject Categories Admin Migration to Subjects Table

## Summary
Successfully migrated the Subject Categories admin page from using the `subjectcategory` table to the `subjects` table.

## Changes Made

### 1. Database Connection
- **Old Table**: `subjectcategory` (with fields: id, name, slug, description, contentTypeId, sortOrder, createdAt, ishomepage, isslider)
- **New Table**: `subjects` (with fields: id, subject, created_at, updated_at)

### 2. API Endpoints Updated

#### `/api/subjectcategories/index.ts` (GET/POST)
- **GET**: Now queries `subjects` table and returns data with `subject` field aliased as `name`
- **POST**: Only requires `name` field, inserts into `subjects` table as `subject`
- Removed: slug, description, contentTypeId, sortOrder, ishomepage, isslider fields

#### `/api/subjectcategories/[id].ts` (GET/PUT/DELETE)
- **GET**: Fetches from `subjects` table with `subject` aliased as `name`
- **PUT**: Only updates the `subject` field (and `updated_at` timestamp)
- **DELETE**: Removes from `subjects` table
- Removed: All extra fields that were in subjectcategory table

### 3. Admin Page Updated

#### `/admin/subjectcategories.tsx`
- **Simplified Interface**: `SubjectCategory` type now only has: id, name, createdAt, updatedAt
- **Removed UI Elements**:
  - Slug field (auto-generated from name)
  - Description textarea
  - Sort Order field
  - Content Type dropdown
  - Homepage toggle checkbox
  - Slider toggle checkbox
  
- **Current UI**: Simple form with just "Subject Name" field
- **Display**: Shows subject name, creation date, and update date

### 4. Subjects Table Structure
```sql
CREATE TABLE subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(255) NOT NULL,
  updated_at DATETIME,
  created_at DATETIME
);
```

### 5. Current Data
The `subjects` table contains 20+ subjects including:
- Alternative Medicine
- Anaesthesia
- Anatomy
- Applied Anatomy
- Applied Biochemistry
- Biochemistry
- Cardiology
- And more...

## API Usage

### List all subjects
```bash
GET /api/subjectcategories
```

### Get specific subject
```bash
GET /api/subjectcategories/[id]
```

### Create new subject
```bash
POST /api/subjectcategories
Body: { "name": "New Subject" }
```

### Update subject
```bash
PUT /api/subjectcategories/[id]
Body: { "name": "Updated Subject Name" }
```

### Delete subject
```bash
DELETE /api/subjectcategories/[id]
```

## Notes
- The admin page URL remains `/admin/subjectcategories` for backwards compatibility
- The API endpoints remain under `/api/subjectcategories` for backwards compatibility
- All TypeScript compilation errors have been resolved
- The simplified structure makes it easier to manage subjects
