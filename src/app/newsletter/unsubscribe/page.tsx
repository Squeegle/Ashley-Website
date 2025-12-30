/**
 * Newsletter Unsubscribe Page
 * 
 * This page handles the unsubscribe flow for newsletter subscribers.
 * Users arrive here by clicking the unsubscribe link in their emails.
 * 
 * The page can display three states:
 * 1. Success - User has been successfully unsubscribed
 * 2. Error - Invalid token or other error occurred
 * 3. Confirmation - Asking user to confirm unsubscription (when token is in URL)
 * 
 * URL Parameters:
 * - token: The unsubscribe token (required for confirmation flow)
 * - success: Set to 'true' after successful unsubscription
 * - error: Error type (missing_token, invalid_token, server_error)
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, CheckCircle, XCircle, ArrowLeft, Loader2 } from 'lucide-react';

/**
 * Loading fallback component for Suspense boundary
 */
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-primary">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Main unsubscribe content component
 * Separated to work with Suspense for useSearchParams
 */
function UnsubscribeContent() {
  // Get URL search parameters to determine page state
  const searchParams = useSearchParams();
  
  // Extract parameters from URL
  const token = searchParams.get('token');
  const successParam = searchParams.get('success');
  const errorParam = searchParams.get('error');
  
  // Component state
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  /**
   * Effect to handle URL-based status (from API redirects)
   * This runs when the page loads with success or error parameters
   */
  useEffect(() => {
    if (successParam === 'true') {
      setStatus('success');
      setMessage('You have been successfully unsubscribed from our newsletter.');
    } else if (errorParam) {
      setStatus('error');
      // Set appropriate error message based on error type
      switch (errorParam) {
        case 'missing_token':
          setMessage('No unsubscribe token was provided. Please use the link from your email.');
          break;
        case 'invalid_token':
          setMessage('This unsubscribe link is invalid or has expired.');
          break;
        case 'server_error':
          setMessage('An error occurred. Please try again later.');
          break;
        default:
          setMessage('An unexpected error occurred.');
      }
    }
  }, [successParam, errorParam]);

  /**
   * Handle the unsubscribe confirmation
   * Called when user clicks the "Unsubscribe" button
   */
  const handleUnsubscribe = async () => {
    // Validate that we have a token
    if (!token) {
      setStatus('error');
      setMessage('No unsubscribe token found. Please use the link from your email.');
      return;
    }

    setIsLoading(true);

    try {
      // Call the unsubscribe API endpoint
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Unsubscription successful
        setStatus('success');
        setMessage(data.message || 'You have been successfully unsubscribed.');
      } else {
        // Unsubscription failed
        setStatus('error');
        setMessage(data.message || 'Failed to unsubscribe. Please try again.');
      }
    } catch {
      // Network or other error
      setStatus('error');
      setMessage('An error occurred while processing your request. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Render the success state
   * Shown after successful unsubscription
   */
  const renderSuccess = () => (
    <div className="text-center">
      {/* Success icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>
      
      {/* Success title */}
      <h1 className="text-3xl md:text-4xl font-serif text-primary mb-4">
        Unsubscribed Successfully
      </h1>
      
      {/* Success message */}
      <p className="text-lg text-primary mb-8 max-w-md mx-auto">
        {message}
      </p>
      
      {/* Additional message */}
      <p className="text-primary mb-8">
        We&apos;re sorry to see you go. You can always resubscribe if you change your mind.
      </p>
      
      {/* Return home button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Homepage
      </Link>
    </div>
  );

  /**
   * Render the error state
   * Shown when there's an error with the unsubscribe process
   */
  const renderError = () => (
    <div className="text-center">
      {/* Error icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
        <XCircle className="w-10 h-10 text-red-600" />
      </div>
      
      {/* Error title */}
      <h1 className="text-3xl md:text-4xl font-serif text-primary mb-4">
        Unsubscribe Failed
      </h1>
      
      {/* Error message */}
      <p className="text-lg text-primary mb-8 max-w-md mx-auto">
        {message}
      </p>
      
      {/* Help text */}
      <p className="text-primary mb-8">
        If you continue to have issues, please contact us for assistance.
      </p>
      
      {/* Return home button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Homepage
      </Link>
    </div>
  );

  /**
   * Render the confirmation state
   * Shown when user arrives with a valid token and needs to confirm
   */
  const renderConfirmation = () => (
    <div className="text-center">
      {/* Mail icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
        <Mail className="w-10 h-10 text-primary" />
      </div>
      
      {/* Confirmation title */}
      <h1 className="text-3xl md:text-4xl font-serif text-primary mb-4">
        Unsubscribe from Newsletter
      </h1>
      
      {/* Confirmation message */}
      <p className="text-lg text-primary mb-8 max-w-md mx-auto">
        Are you sure you want to unsubscribe from our newsletter? 
        You&apos;ll no longer receive our weekly updates and exclusive content.
      </p>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Unsubscribe button */}
        <button
          onClick={handleUnsubscribe}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Yes, Unsubscribe Me'
          )}
        </button>
        
        {/* Cancel button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-primary rounded-md hover:bg-gray-300 transition-colors duration-200 font-semibold"
        >
          No, Keep Me Subscribed
        </Link>
      </div>
    </div>
  );

  /**
   * Render the idle state (no token provided)
   * Shown when user navigates directly to the page without a token
   */
  const renderIdle = () => (
    <div className="text-center">
      {/* Mail icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
        <Mail className="w-10 h-10 text-primary" />
      </div>
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-serif text-primary mb-4">
        Newsletter Unsubscribe
      </h1>
      
      {/* Message */}
      <p className="text-lg text-primary mb-8 max-w-md mx-auto">
        To unsubscribe from our newsletter, please click the unsubscribe link 
        in any of our emails. Each email contains a unique link for your subscription.
      </p>
      
      {/* Return home button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-200 font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Homepage
      </Link>
    </div>
  );

  /**
   * Determine which state to render based on current status and URL params
   */
  const renderContent = () => {
    // If we have a success or error status, show that
    if (status === 'success') return renderSuccess();
    if (status === 'error') return renderError();
    
    // If we have a token but no status yet, show confirmation
    if (token) return renderConfirmation();
    
    // Otherwise, show the idle state
    return renderIdle();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main content container */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Card container with subtle shadow */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-12">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Main page component with Suspense boundary
 * Required for Next.js App Router with useSearchParams
 */
export default function UnsubscribePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UnsubscribeContent />
    </Suspense>
  );
}

