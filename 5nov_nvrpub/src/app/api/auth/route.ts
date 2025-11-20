import { NextRequest, NextResponse } from 'next/server';
import { ApiAuthentication, ApiAuthenticationRepository } from '@/models/ApiAuthentication';
import { generateApiKey } from '@/utils/tokenGenerator';

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string; // Add message property for success/error messages
};

// GET /api/auth - Get all API authentications with optional filtering
export async function GET(request: NextRequest) {
  try {
    // Ensure table exists (create if it doesn't)
    try {
      await ApiAuthenticationRepository.findAll({ limit: 1 });
    } catch (tableError: any) {
      // If table doesn't exist, create it
      if (tableError.code === 'ER_NO_SUCH_TABLE' || tableError.message?.includes("doesn't exist") || tableError.message?.includes("Unknown table")) {
        const { query } = await import('@/utils/db');
        await query(`
          CREATE TABLE IF NOT EXISTS \`api_authentications\` (
            \`id\` INT NOT NULL AUTO_INCREMENT,
            \`username\` VARCHAR(255) NOT NULL,
            \`token_value\` TEXT NOT NULL,
            \`auth_method\` ENUM('IP-Based', 'None') NOT NULL DEFAULT 'None',
            \`status\` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
            \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`idx_username\` (\`username\`),
            KEY \`idx_status\` (\`status\`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
      } else {
        throw tableError;
      }
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') as 'Active' | 'Inactive' | undefined;
    const startsWith = searchParams.get('startsWith') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;

    const [authentications, total] = await Promise.all([
      ApiAuthenticationRepository.findAll({
        search,
        status,
        startsWith,
        limit,
        offset,
      }),
      ApiAuthenticationRepository.count({ status }),
    ]);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        items: authentications,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching API authentications:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch API authentications';
    console.error('Full error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return NextResponse.json<ApiResponse>(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// POST /api/auth - Create a new API authentication
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.username) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Username is required' },
        { status: 400 }
      );
    }

    // Ensure table exists (create if it doesn't)
    try {
      await ApiAuthenticationRepository.findAll({ limit: 1 });
    } catch (tableError: any) {
      // If table doesn't exist, create it
      if (tableError.code === 'ER_NO_SUCH_TABLE' || tableError.message?.includes("doesn't exist")) {
        const { query } = await import('@/utils/db');
        await query(`
          CREATE TABLE IF NOT EXISTS \`api_authentications\` (
            \`id\` INT NOT NULL AUTO_INCREMENT,
            \`username\` VARCHAR(255) NOT NULL,
            \`token_value\` TEXT NOT NULL,
            \`auth_method\` ENUM('IP-Based', 'None') NOT NULL DEFAULT 'None',
            \`status\` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
            \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`),
            UNIQUE KEY \`idx_username\` (\`username\`),
            KEY \`idx_status\` (\`status\`)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `);
      } else {
        throw tableError;
      }
    }

    // Generate a secure API key
    const tokenValue = generateApiKey();
    
    // Create the authentication record
    const id = await ApiAuthenticationRepository.create({
      username: body.username,
      token_value: tokenValue,
      auth_method: body.auth_method || 'None',
      status: 'Active',
    });

    // Return the created record (without sensitive data in production)
    const authentication = await ApiAuthenticationRepository.findById(id);
    
    return NextResponse.json<ApiResponse>(
      { 
        success: true, 
        data: authentication,
        message: 'API authentication created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating API authentication:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create API authentication';
    console.error('Full error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return NextResponse.json<ApiResponse>(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    );
  }
}

// PUT /api/auth - Update an existing API authentication
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'ID parameter is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updateData: Partial<ApiAuthentication> = {};
    
    // Only include fields that are provided in the request
    if (body.username !== undefined) updateData.username = body.username;
    if (body.auth_method !== undefined) updateData.auth_method = body.auth_method;
    if (body.status !== undefined) updateData.status = body.status;
    
    // If no valid fields to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'No valid fields provided for update' },
        { status: 400 }
      );
    }

    const updated = await ApiAuthenticationRepository.update(parseInt(id, 10), updateData);
    
    if (!updated) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'API authentication not found' },
        { status: 404 }
      );
    }

    // Return the updated record
    const authentication = await ApiAuthenticationRepository.findById(parseInt(id, 10));
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: authentication,
      message: 'API authentication updated successfully'
    });
  } catch (error) {
    console.error('Error updating API authentication:', error);
    return NextResponse.json<ApiResponse>(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update API authentication' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/auth - Delete an API authentication
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'ID parameter is required' },
        { status: 400 }
      );
    }

    const deleted = await ApiAuthenticationRepository.delete(parseInt(id, 10));
    
    if (!deleted) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'API authentication not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'API authentication deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting API authentication:', error);
    return NextResponse.json<ApiResponse>(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete API authentication' 
      },
      { status: 500 }
    );
  }
}
