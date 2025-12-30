/**
 * Newsletter Unsubscribe API Endpoint
 * 
 * POST /api/newsletter/unsubscribe
 * 
 * This endpoint handles newsletter unsubscription requests.
 * It validates the unsubscribe token and removes the subscriber
 * from the active mailing list.
 * 
 * Request body:
 * {
 *   "token": "unique-unsubscribe-token-uuid"
 * }
 * 
 * Success response (200):
 * {
 *   "success": true,
 *   "message": "You have been successfully unsubscribed from our newsletter"
 * }
 * 
 * Error responses:
 * - 400: Invalid or missing token
 * - 404: Token not found
 * - 500: Server error
 */

import { NextRequest, NextResponse } from 'next/server';
import { removeSubscriber } from '@/lib/newsletter';

/**
 * POST handler for newsletter unsubscriptions
 * 
 * @param request - The incoming request object
 * @returns NextResponse with success/error status
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the unsubscribe token
    const body = await request.json();
    const { token } = body;

    // Validate that token was provided
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unsubscribe token is required'
        },
        { status: 400 }
      );
    }

    // Validate token format (basic check)
    if (typeof token !== 'string' || token.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid unsubscribe token format'
        },
        { status: 400 }
      );
    }

    // Attempt to remove the subscriber
    const result = await removeSubscriber(token);

    // If the unsubscription failed (e.g., invalid token)
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message
        },
        { status: 404 }
      );
    }

    // Unsubscription successful
    return NextResponse.json(
      {
        success: true,
        message: result.message
      },
      { status: 200 }
    );

  } catch (error) {
    // Log the error for debugging
    console.error('Newsletter unsubscription error:', error);

    // Return a generic error message to the client
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your unsubscription. Please try again later.'
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler for unsubscribe requests via URL
 * This allows users to unsubscribe by clicking a link in their email
 * 
 * GET /api/newsletter/unsubscribe?token=xxx
 * 
 * Redirects to the unsubscribe page with the result
 */
export async function GET(request: NextRequest) {
  try {
    // Get the token from the URL query parameters
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    // If no token provided, redirect to unsubscribe page with error
    if (!token) {
      return NextResponse.redirect(
        new URL('/newsletter/unsubscribe?error=missing_token', request.url)
      );
    }

    // Attempt to remove the subscriber
    const result = await removeSubscriber(token);

    // Redirect to unsubscribe page with appropriate status
    if (result.success) {
      return NextResponse.redirect(
        new URL('/newsletter/unsubscribe?success=true', request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL('/newsletter/unsubscribe?error=invalid_token', request.url)
      );
    }

  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    return NextResponse.redirect(
      new URL('/newsletter/unsubscribe?error=server_error', request.url)
    );
  }
}

