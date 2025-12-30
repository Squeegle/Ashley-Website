'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail, Heart, Check, Loader2 } from 'lucide-react';

/**
 * Footer Component - Main navigation and branding for the website
 * Features:
 * - Newsletter subscription on the right (connected to subscribe API)
 * - Social media links
 * - Contact information
 * - Quick navigation links
 * - Copyright and legal information
 * - Clean, minimal design with better visual hierarchy
 */
export default function Footer() {
  // Newsletter form state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle newsletter form submission
   * Validates email and sends to the subscribe API endpoint
   */
  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic email validation (client-side for immediate feedback)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the newsletter subscribe API endpoint
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Parse the response from the server
      const data = await response.json();

      // Check if the subscription was successful
      if (response.ok && data.success) {
        // Subscription successful - show success state
        setIsSuccess(true);
        setEmail('');
        
        // Reset success state after 5 seconds so user can subscribe again if needed
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        // Subscription failed - show error message from server
        setError(data.message || 'Something went wrong. Please try again.');
      }
      
    } catch {
      // Network error or other exception
      setError('Unable to connect. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // Footer navigation organized by sections
  const footerSections = [
    {
      title: 'Explore',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Shop', href: 'https://www.shopltk.com/explore/Ashley_Rose/', external: true },
      ],
    },
  ];

  // Social media links
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/ashleyrosep?igsh=eDhtaWRlcTY2MXpz', color: 'hover:text-pink-600' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/share/1Cpr5LSvy6/', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@ashleyrose6?si=z_DMlLzZB_-jEhQK', color: 'hover:text-red-600' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@ashleyrose.com', color: 'hover:text-gray-600' },
  ];

  return (
    <footer className="bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          
          {/* Brand Section - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-serif text-contrast mb-3 font-medium">At home with Rose</h2>
              <p className="text-contrast leading-relaxed font-medium mb-4">
                Sharing real-life home projects, everyday chaos, and the beauty in the in-between. I&apos;m Ashley—a mom of four making spaces feel like home, one imperfect project at a time.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`p-2 text-contrast ${social.color} transition-colors duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-sm`}
                    aria-label={social.name}
                    {...(social.name !== 'Email' ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <IconComponent size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation Section - Takes up 1 column */}
          <div className="lg:col-span-1">
            {footerSections.map((section) => (
              <div key={section.title} className="lg:col-span-1">
                <h3 className="text-lg font-serif text-contrast mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-contrast hover:text-contrast/80 transition-colors duration-200 font-medium"
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <div className="bg-secondary p-0">
              <h3 className="text-2xl font-serif text-contrast mb-3 font-medium">
                Get Weekly Updates
              </h3>
              <p className="text-contrast mb-6 leading-relaxed font-medium">
                Get weekly design inspiration, styling tips, and exclusive behind-the-scenes content delivered straight to your inbox.
              </p>
              <div className="flex items-center space-x-4 text-sm text-contrast mb-4">
                <span className="flex items-center">
                  <Heart size={16} className="text-red-500 mr-2" />
                  10,000+ subscribers
                </span>
                <span>•</span>
                <span>No spam, ever</span>
              </div>
              {/* Success state - shown after successful subscription */}
              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-3">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-green-800 font-medium">
                    Thank you for subscribing!
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    We&apos;re excited to share our latest updates with you.
                  </p>
                </div>
              ) : (
                /* Newsletter subscription form */
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                      disabled={isSubmitting}
                    />
                    {/* Error message display */}
                    {error && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full px-6 py-3 bg-primary !text-white hover:!text-white rounded-md hover:bg-primary-dark transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Subscribing...
                      </span>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom trim with copyright */}
      <div className="bg-primary [&_*]:!text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-2">
            <p className="text-sm font-medium">
              © {new Date().getFullYear()} Ashley Rose. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 