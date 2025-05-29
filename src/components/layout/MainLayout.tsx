'use client';

import Header from './Header';
import Footer from './Footer';
import NewsletterModal from '@/components/ui/NewsletterModal';
import { useNewsletterModal } from '@/hooks/useNewsletterModal';

/**
 * MainLayout Component - Wraps all pages with consistent header and footer
 * This component provides:
 * - Consistent header and footer across all pages
 * - Proper spacing and structure
 * - Responsive layout foundation
 * - Newsletter modal for first-time visitors
 * - Easy to maintain site-wide design changes
 */

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className = '' }: MainLayoutProps) {
  // Newsletter modal functionality
  const { isVisible, hideModal } = useNewsletterModal();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - sticky navigation */}
      <Header />
      
      {/* Main content area - flex-1 pushes footer to bottom */}
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      
      {/* Footer */}
      <Footer />

      {/* Newsletter Modal - shows on first visit */}
      <NewsletterModal 
        isVisible={isVisible}
        onClose={hideModal}
      />
    </div>
  );
} 