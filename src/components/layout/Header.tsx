'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, Instagram, Facebook, Youtube, Search } from 'lucide-react';

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
    { name: 'Shop', href: 'https://www.shopltk.com/explore/Ashley_Rose/', external: true },
  ];

  // Social media links
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/ashleyrosep?igsh=eDhtaWRlcTY2MXpz', color: 'hover:text-pink-600' },
    { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/share/1Cpr5LSvy6/', color: 'hover:text-blue-600' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@ashleyrose6?si=z_DMlLzZB_-jEhQK', color: 'hover:text-red-600' },
  ];

  /**
   * HeaderSearch Component - Search functionality in header
   */
  function HeaderSearch() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchValue.trim()) {
        router.push(`/blog?search=${encodeURIComponent(searchValue.trim())}`);
        setSearchValue('');
      }
    };

    return (
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-48 lg:w-56 pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm"
          />
        </div>
      </form>
    );
  }

  return (
    <header className="bg-secondary shadow-sm border-b border-secondary sticky top-0 z-50">
      {/* Top bar with social links - hidden on mobile */}
      <div className="hidden md:block bg-primary border-b border-primary [&_*]:!text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            {/* Left side - empty for balance */}
            <div></div>
            
            {/* Right side - Social links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Follow us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className={`hover:text-gray-200 transition-colors duration-200`}
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
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
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-primary text-center text-crisp font-medium">
                At home with Rose
              </h1>
              <p className="text-sm text-primary text-center mt-1 font-semibold tracking-wide">
                Interior Design & Lifestyle
              </p>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block pb-4 relative">
          {/* Centered Navigation Items */}
          <ul className="flex justify-center space-x-8 lg:space-x-12">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-white hover:text-white/80 transition-all duration-200 font-medium border-b-2 border-transparent hover:border-primary pb-1"
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Search Field - Positioned to the right */}
          <div className="absolute right-0 top-0 flex items-center">
            <HeaderSearch />
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary border-t border-gray-100">
          <nav className="px-4 py-4">
            <ul className="space-y-4">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-white/80 transition-all duration-200 font-medium border-b-2 border-transparent hover:border-primary pb-1"
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Mobile search */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const searchValue = formData.get('search') as string;
                if (searchValue?.trim()) {
                  window.location.href = `/blog?search=${encodeURIComponent(searchValue.trim())}`;
                }
              }}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-3 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm font-semibold"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Mobile social links */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-center space-x-6">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`text-white ${social.color} transition-colors duration-200`}
                      aria-label={social.name}
                      target="_blank"
                      rel="noopener noreferrer"
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