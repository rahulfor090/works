import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const subjectId = searchParams.get('subjectId');
        const subjectName = searchParams.get('subjectName');

        let sql = `
      SELECT s.*, sp.title as subject_name 
      FROM subcategories s
      LEFT JOIN specialties sp ON s.subject_id = sp.id
    `;
        let params = [];
        let whereClauses = [];

        if (subjectId) {
            whereClauses.push('s.subject_id = ?');
            params.push(subjectId);
        }

        if (subjectName) {
            whereClauses.push('sp.title = ?');
            params.push(subjectName);
        }

        if (whereClauses.length > 0) {
            sql += ' WHERE ' + whereClauses.join(' AND ');
        }

        sql += ' ORDER BY s.name ASC';

        const subcategories = await query(sql, params);

        return NextResponse.json(subcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch subcategories' },
            { status: 500 }
        );
    }
}
