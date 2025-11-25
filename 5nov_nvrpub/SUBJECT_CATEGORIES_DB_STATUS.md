# Subject Categories Admin Dashboard - Database Integration

## ✅ Status: FULLY CONNECTED

The Subject Categories page in the admin dashboard is **already fully connected** to the database.

---

## 📊 Database Table: `subjectcategory`

### Table Structure:
- `id` - Auto-increment primary key
- `name` - Category name (varchar 128)
- `slug` - URL-friendly slug (varchar 128, unique)
- `description` - Category description (varchar 512)
- `contentTypeId` - Foreign key to contenttype table (int)
- `sortOrder` - Display order (int, default 0)
- `createdAt` - Timestamp (auto-generated)
- `ishomepage` - Show on homepage flag (tinyint, 0 or 1)
- `isslider` - Show in slider flag (tinyint, 0 or 1)

### Current Data:
The database currently has **14 subject categories**:
- Medicine, Dentistry, Nursing
- Surgery, Radiology, Paediatrics, Anatomy
- Alternative Medicine, Biochemistry, Biotechnology
- Cardiology, Critical Care, Dental Materials
- Test (sample entry)

---

## 🔌 API Endpoints (Already Created)

### 1. GET `/api/subjectcategories`
**Purpose**: Fetch all subject categories
**Query Parameters**: 
- `ishomepage` (optional) - Filter by homepage visibility

**Response**: Array of subject category objects
```json
[
  {
    "id": 1,
    "name": "Medicine",
    "slug": "medicine",
    "description": "Welcome to the Dummy Text",
    "contentTypeId": 1,
    "sortOrder": 1,
    "createdAt": "2025-10-23T16:46:11.000Z",
    "ishomepage": 1,
    "isslider": 1
  }
]
```

### 2. POST `/api/subjectcategories`
**Purpose**: Create a new subject category
**Request Body**:
```json
{
  "name": "New Category",
  "slug": "new-category",
  "description": "Category description",
  "contentTypeId": 1,
  "sortOrder": 0,
  "ishomepage": 0,
  "isslider": 0
}
```

**Response**: 
```json
{
  "id": 58
}
```

### 3. GET `/api/subjectcategories/[id]`
**Purpose**: Fetch a single subject category by ID
**Response**: Subject category object

### 4. PUT `/api/subjectcategories/[id]`
**Purpose**: Update an existing subject category
**Request Body**: Same as POST

### 5. DELETE `/api/subjectcategories/[id]`
**Purpose**: Delete a subject category
**Response**: 
```json
{
  "ok": true
}
```

---

## 🎨 Frontend Features

### Admin Page: `/admin/subjectcategories`

#### ✅ Features Implemented:

1. **View All Categories**
   - Lists all subject categories from database
   - Shows: Name, Slug, Content Type, Description, Sort Order, Created Date
   - Displays homepage visibility count

2. **Create New Category**
   - Form with fields: Name, Slug, Description, Content Type, Sort Order
   - Auto-generates slug from name
   - Switches for "Show on Homepage" and "Show in Slider"
   - Saves to database via API

3. **Edit Category**
   - Click edit icon to populate form
   - Updates existing category in database
   - Cancel button to reset form

4. **Delete Category**
   - Click delete icon to remove
   - Deletes from database permanently

5. **Toggle Homepage Visibility**
   - Checkbox to quickly toggle ishomepage flag
   - Optimistic UI update (instant feedback)
   - Auto-saves to database
   - Shows "Saving..." indicator during update

6. **Success/Error Notifications**
   - Snackbar notifications for all actions
   - Success messages for create/update/delete
   - Error messages if operations fail

---

## 🔗 Content Types Integration

The page also fetches content types from `/api/contenttypes`:
- Books
- Videos
- Journals
- Cases
- MCQs
- Reviews

Each subject category must be assigned to one content type.

---

## 🧪 Testing

### Test Creating a Category:

1. Go to `/admin/subjectcategories`
2. Fill in the form:
   - Name: "Pharmacology"
   - Slug: auto-generated as "pharmacology"
   - Description: "Drug mechanisms and therapeutics"
   - Content Type: Select "Books"
   - Sort Order: 0
   - Enable "Show on Homepage"
3. Click "Create Subject Category"
4. See success message
5. Category appears in list below

### Test Updating:

1. Click edit icon on any category
2. Form populates with existing data
3. Modify any field (e.g., change description)
4. Click "Update Subject Category"
5. See success message
6. Changes reflected in list

### Test Deleting:

1. Click delete icon on "Test" category
2. Category removed from list
3. Deleted from database

### Test Homepage Toggle:

1. Click checkbox under "Add to Home" for any category
2. See "Saving..." indicator
3. Checkbox updates immediately
4. Success notification appears
5. Change saved to database

---

## 📝 Database Queries Used

```sql
-- Fetch all categories
SELECT id, name, slug, description, contentTypeId, sortOrder, createdAt, ishomepage, isslider 
FROM subjectcategory 
ORDER BY sortOrder ASC, name ASC;

-- Insert new category
INSERT INTO subjectcategory (name, slug, description, contentTypeId, sortOrder, createdAt, ishomepage, isslider) 
VALUES (?, ?, ?, ?, ?, NOW(), ?, ?);

-- Update category
UPDATE subjectcategory 
SET name = ?, slug = ?, description = ?, contentTypeId = ?, sortOrder = ?, ishomepage = ?, isslider = ? 
WHERE id = ?;

-- Delete category
DELETE FROM subjectcategory WHERE id = ?;
```

---

## 🎯 Summary

✅ **Frontend Page**: Fully functional at `/admin/subjectcategories`
✅ **API Endpoints**: All CRUD operations implemented
✅ **Database Connection**: Working correctly
✅ **Real-time Updates**: Categories are saved and loaded from DB
✅ **Error Handling**: Notifications for success/failure

**No additional work needed** - the system is fully operational!

---

## 🔍 How to Verify

1. Start your dev server: `npm run dev`
2. Navigate to: `http://localhost:3001/admin/subjectcategories`
3. Log in if required
4. You should see all 14 categories from the database
5. Try creating a new category - it will save to DB
6. Try editing/deleting - changes will persist in DB

---

## 📂 File Locations

- **Frontend Page**: `src/pages/admin/subjectcategories.tsx`
- **API Routes**: 
  - `src/pages/api/subjectcategories/index.ts`
  - `src/pages/api/subjectcategories/[id].ts`
- **Database Util**: `src/utils/db.ts`
- **Content Types API**: `src/pages/api/contenttypes/index.ts`

---

✨ **Everything is working perfectly!** Your admin dashboard is fully connected to the database.
