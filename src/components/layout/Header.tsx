'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Instagram, Facebook, Twitter } from 'lucide-react';

/**
 * Header Component - Main navigation and branding for the website
 * Features:
 * - Centered logo/brand name
 * - Horizontal navigation with dropdown support
 * - Social media links
 * - Mobile-responsive hamburger menu
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Main navigation items - easily configurable
  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Projects', href: '/projects' },
    { name: 'Collaboration Opportunities', href: '/contact' },
  ];

  // Social media links
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Top bar with social links - hidden on mobile */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            {/* Left side - empty for balance */}
            <div></div>
            
            {/* Right side - Social links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-contrast font-medium">Follow us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`text-contrast ${social.color} transition-colors duration-200`}
                    aria-label={social.name}
                  >
                    <IconComponent size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-muted hover:text-primary hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo/Brand Name - Centered */}
          <div className="flex-1 flex justify-center md:justify-center">
            <Link href="/" className="block">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-contrast text-center text-crisp font-medium">
                At home with Rose
              </h1>
              <p className="text-sm text-contrast text-center mt-1 font-semibold tracking-wide">
                Interior Design & Lifestyle
              </p>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block pb-4">
          <ul className="flex justify-center space-x-8 lg:space-x-12">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-contrast text-sm lg:text-base uppercase transition-colors duration-200 border-b-2 border-transparent hover:border-gray-600 hover:text-gray-800 font-semibold"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="px-4 py-4">
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-contrast hover:text-gray-800 font-semibold py-2 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Mobile social links */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`text-contrast ${social.color} transition-colors duration-200`}
                      aria-label={social.name}
                    >
                      <IconComponent size={20} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 