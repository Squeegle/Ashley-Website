import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Heart } from 'lucide-react';

/**
 * Footer Component - Site footer with links, social media, and newsletter signup
 * Features:
 * - Newsletter subscription
 * - Social media links
 * - Quick navigation links
 * - Copyright information
 * - Clean, minimal design matching header
 */
export default function Footer() {
  // Footer navigation organized by sections
  const footerSections = [
    {
      title: 'Navigate',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Interior Design', href: '/services/interior-design' },
        { name: 'Consultations', href: '/services/consultations' },
        { name: 'Virtual Design', href: '/services/virtual-design' },
        { name: 'Styling', href: '/services/styling' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Design Tips', href: '/blog/category/tips' },
        { name: 'Inspiration', href: '/blog/category/inspiration' },
        { name: 'Shopping Guides', href: '/blog/category/shopping' },
        { name: 'Before & After', href: '/gallery/before-after' },
      ],
    },
  ];

  // Social media links
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@ashleyrose.com', color: 'hover:text-gray-600' },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Newsletter Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-serif text-contrast mb-4 font-medium">
              Stay Inspired
            </h3>
            <p className="text-contrast mb-6 leading-relaxed font-medium">
              Get weekly design inspiration, styling tips, and exclusive content delivered to your inbox.
            </p>
            
            {/* Newsletter signup form */}
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-contrast font-medium"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-semibold"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-xs text-contrast mt-3 font-medium">
              No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-xl font-serif text-contrast mb-2 font-medium">Ashley Rose</h2>
              <p className="text-sm text-contrast leading-relaxed font-medium">
                Creating beautiful, functional spaces that tell your story. 
                Interior design and lifestyle inspiration for the modern home.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
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

          {/* Footer Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-contrast uppercase tracking-wide mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-contrast hover:text-gray-700 transition-colors duration-200 font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 text-sm text-contrast mb-4 md:mb-0 font-medium">
              <span>© {new Date().getFullYear()} Ashley Rose Design.</span>
              <span>Made with</span>
              <Heart size={14} className="text-red-500 fill-current" />
              <span>for beautiful spaces.</span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-contrast hover:text-gray-700 transition-colors duration-200 font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-contrast hover:text-gray-700 transition-colors duration-200 font-medium">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 