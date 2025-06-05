import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Heart, Phone, MapPin, Clock } from 'lucide-react';

/**
 * Footer Component - Site footer with links, social media, and newsletter signup
 * Features:
 * - Newsletter subscription
 * - Multiple organized content sections
 * - Social media links
 * - Contact information
 * - Quick navigation links
 * - Copyright and legal information
 * - Clean, minimal design with better visual hierarchy
 */
export default function Footer() {
  // Footer navigation organized by sections for better distribution
  const footerSections = [
    {
      title: 'Explore',
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Collaborations', href: '/contact' },
        { name: 'Design Consultation', href: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Design Tips', href: '/blog' },
        { name: 'Style Guide', href: '/blog' },
      ],
    },
  ];

  // Contact information for better footer content distribution
  const contactInfo = [
    { icon: Mail, text: 'hello@ashleyrose.com', href: 'mailto:hello@ashleyrose.com' },
    { icon: Phone, text: '(555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, text: 'Los Angeles, CA', href: '#' },
    { icon: Clock, text: 'Mon-Fri 9AM-5PM', href: '#' },
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter Content */}
            <div className="text-center lg:text-left">
              <h3 className="text-3xl md:text-4xl font-serif text-contrast mb-4 font-medium">
                Stay Inspired
              </h3>
              <p className="text-lg text-contrast mb-6 leading-relaxed font-medium">
                Get weekly design inspiration, styling tips, and exclusive behind-the-scenes content delivered straight to your inbox.
              </p>
              <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-contrast">
                <span className="flex items-center">
                  <Heart size={16} className="text-red-500 mr-2" />
                  10,000+ subscribers
                </span>
                <span>•</span>
                <span>Weekly updates</span>
                <span>•</span>
                <span>No spam, ever</span>
              </div>
            </div>
            
            {/* Newsletter Form */}
            <div className="max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-contrast font-medium"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-semibold whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-contrast font-medium">
                  By subscribing, you agree to our privacy policy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          
          {/* Brand Section - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-serif text-contrast mb-3 font-medium">At home with Rose</h2>
              <p className="text-contrast leading-relaxed font-medium mb-4">
                Creating beautiful, functional spaces that tell your story. Interior design and lifestyle inspiration for the modern home.
              </p>
              <p className="text-sm text-contrast leading-relaxed font-medium">
                Transforming houses into homes, one room at a time. Join me on this journey of creating spaces that inspire and delight.
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
                  >
                    <IconComponent size={18} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation Sections - Each takes 1 column */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-sm font-bold text-contrast uppercase tracking-wide mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-contrast hover:text-gray-700 transition-colors duration-200 font-medium block py-1"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Information - Takes up 1 column */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-bold text-contrast uppercase tracking-wide mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((contact) => {
                const IconComponent = contact.icon;
                const content = (
                  <div className="flex items-center text-sm text-contrast font-medium py-1">
                    <IconComponent size={16} className="mr-3 text-gray-600" />
                    <span>{contact.text}</span>
                  </div>
                );
                
                return (
                  <li key={contact.text}>
                    {contact.href !== '#' ? (
                      <Link href={contact.href} className="hover:text-gray-700 transition-colors duration-200">
                        {content}
                      </Link>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-1 text-sm text-contrast font-medium">
              <span>© {new Date().getFullYear()} Ashley Rose Design.</span>
              <span>Made with</span>
              <Heart size={14} className="text-red-500 fill-current" />
              <span>for beautiful spaces.</span>
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-contrast hover:text-gray-700 transition-colors duration-200 font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-contrast hover:text-gray-700 transition-colors duration-200 font-medium">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-contrast hover:text-gray-700 transition-colors duration-200 font-medium">
                Cookie Policy
              </Link>
            </div>

            {/* Back to Top Link */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm text-contrast hover:text-gray-700 transition-colors duration-200 font-medium flex items-center"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
} 