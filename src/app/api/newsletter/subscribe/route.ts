/**
 * Newsletter Subscribe API Endpoint
 * 
 * POST /api/newsletter/subscribe
 * 
 * This endpoint handles newsletter subscription requests.
 * It validates the email, adds it to the mailing list, and returns
 * appropriate success/error responses.
 * 
 * Request body:
 * {
 *   "email": "user@example.com"
 * }
 * 
 * Success response (201):
 * {
 *   "success": true,
 *   "message": "Successfully subscribed to the newsletter"
 * }
 * 
 * Error responses:
 * - 400: Invalid email or already subscribed
 * - 500: Server error
 */

import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber, isValidEmail } from '@/lib/newsletter';

/**
 * POST handler for newsletter subscriptions
 * 
 * @param request - The incoming request object
 * @returns NextResponse with success/error status
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the email
    const body = await request.json();
    const { email } = body;

    // Validate that email was provided
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email address is required'
        },
        { status: 400 }
      );
    }

    // Validate email format before processing
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please enter a valid email address'
        },
        { status: 400 }
      );
    }

    // Attempt to add the subscriber to the mailing list
    const result = await addSubscriber(email);

    // If the subscription failed (e.g., already subscribed)
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message
        },
        { status: 400 }
      );
    }

    // Subscription successful
    // Return 201 Created status for new subscriptions
    return NextResponse.json(
      {
        success: true,
        message: result.message
      },
      { status: 201 }
    );

  } catch (error) {
    // Log the error for debugging (in production, use proper logging)
    console.error('Newsletter subscription error:', error);

    // Return a generic error message to the client
    // Don't expose internal error details for security
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your subscription. Please try again later.'
      },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported HTTP methods
 * Returns 405 Method Not Allowed for any method other than POST
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed. Use POST to subscribe.'
    },
    { status: 405 }
  );
}

