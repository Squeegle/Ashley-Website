'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Instagram, Facebook, Twitter, Search } from 'lucide-react';

/**
 * Header Component - Main navigation and branding for the website
 * Features:
 * - Centered logo/brand name
 * - Horizontal navigation with dropdown support
 * - Social media links
 * - Mobile-responsive hamburger menu
 * - Search functionality
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Main navigation items - easily configurable
  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
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
              <span className="text-sm text-gray-600">Follow us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`text-gray-500 ${social.color} transition-colors duration-200`}
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
        <div className="flex justify-between items-center py-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo/Brand Name - Centered on desktop, left on mobile */}
          <div className="flex-1 md:flex-none md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <Link href="/" className="block">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gray-900 text-center md:text-center">
                Ashley Rose
              </h1>
              <p className="text-sm text-gray-600 text-center mt-1 font-light tracking-wide">
                Interior Design & Lifestyle
              </p>
            </Link>
          </div>

          {/* Search icon - Desktop */}
          <div className="hidden md:block">
            <button
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block pb-4">
          <ul className="flex justify-center space-x-8 lg:space-x-12">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 font-medium text-sm lg:text-base tracking-wide uppercase transition-colors duration-200 border-b-2 border-transparent hover:border-gray-300"
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
                    className="block text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
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
                      className={`text-gray-500 ${social.color} transition-colors duration-200`}
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