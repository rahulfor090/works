import { NextRequest, NextResponse } from 'next/server';
import { ApiAuthentication, ApiAuthenticationRepository } from '@/models/ApiAuthentication';

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// GET /api/auth/[id] - Get a single API authentication by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const authentication = await ApiAuthenticationRepository.findById(id);
    
    if (!authentication) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'API authentication not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: authentication,
    });
  } catch (error) {
    console.error('Error fetching API authentication:', error);
    return NextResponse.json<ApiResponse>(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch API authentication' 
      },
      { status: 500 }
    );
  }
}

// PUT /api/auth/[id] - Update an API authentication
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid ID format' },
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

    const updated = await ApiAuthenticationRepository.update(id, updateData);
    
    if (!updated) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'API authentication not found' },
        { status: 404 }
      );
    }

    // Return the updated record
    const authentication = await ApiAuthenticationRepository.findById(id);
    
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

// DELETE /api/auth/[id] - Delete an API authentication
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    
    if (isNaN(id)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const deleted = await ApiAuthenticationRepository.delete(id);
    
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
