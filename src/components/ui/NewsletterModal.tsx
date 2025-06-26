'use client';

import { useState, FormEvent } from 'react';
import { X, Mail, Check } from 'lucide-react';
import Image from 'next/image';

/**
 * Newsletter Modal Component
 * A beautiful, responsive modal for collecting email signups
 * Features:
 * - Elegant design matching site aesthetic
 * - Form validation and submission handling
 * - Smooth animations and transitions
 * - Accessible with proper focus management
 * - Mobile-responsive design
 */

interface NewsletterModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isVisible, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle form submission
   * TODO: Connect to actual newsletter service (Mailchimp, ConvertKit, etc.)
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual newsletter service integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just log the email (replace with actual API call)
      console.log('Newsletter signup:', email);
      
      setIsSuccess(true);
      
      // Close modal after success message shows
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail('');
      }, 2000);
      
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle backdrop click to close modal
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * Handle escape key to close modal
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal content */}
        <div className="p-8 pt-12">
          {/* Icon and title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full mb-4">
              <Image
                src="/icons/android-chrome-192x192.png"
                alt="Rose Icon"
                width={32}
                height={32}
                priority
              />
            </div>
            <h2 id="modal-title" className="text-2xl md:text-3xl font-serif text-primary mb-3">
              Get Weekly Updates
            </h2>
            <p className="text-primary text-base leading-relaxed max-w-sm mx-auto">
              Get weekly design inspiration, styling tips, and exclusive content delivered to your inbox.
            </p>
          </div>

          {/* Success state */}
          {isSuccess ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-serif text-primary mb-2">Thank you for subscribing!</h3>
              <p className="text-primary">
                We&apos;re excited to share our latest updates with you.
              </p>
            </div>
          ) : (
            /* Sign-up form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email input */}
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-primary placeholder-gray-400"
                    required
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white dark-button-text rounded-md hover:bg-primary-dark transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          )}

          {/* Privacy note */}
          {!isSuccess && (
            <p className="text-xs text-primary text-center mt-4">
              No spam, unsubscribe at any time.
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 