'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { NewsletterModal, LandingSequence } from '@/components/ui';
import { useNewsletterModal } from '@/hooks/useNewsletterModal';

/**
 * MainLayout Component - Wraps all pages with consistent header and footer
 * This component provides:
 * - Consistent header and footer across all pages
 * - Proper spacing and structure
 * - Responsive layout foundation
 * - Newsletter modal for first-time visitors (after landing sequence)
 * - Easy to maintain site-wide design changes
 */

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className = '' }: MainLayoutProps) {
  const [landingSequenceComplete, setLandingSequenceComplete] = useState(false);
  
  // Newsletter modal functionality
  // Pass landingSequenceComplete to the hook to control its timer
  const { 
    isVisible: isNewsletterVisible, 
    showModal: showNewsletterModal, // We might not need showNewsletterModal directly here anymore
    hideModal: hideNewsletterModal 
  } = useNewsletterModal({ isReadyToShow: landingSequenceComplete });

  const handleLandingComplete = () => {
    setLandingSequenceComplete(true);
    // No need to manually call showNewsletterModal here,
    // as useNewsletterModal will now start its timer because isReadyToShow becomes true.
  };
  
  // Conditionally render LandingSequence or the main content + newsletter
  // The hook useNewsletterModal is called on every render, but its internal useEffect
  // for the timer will only run/restart when landingSequenceComplete changes.
  if (!landingSequenceComplete) {
    return <LandingSequence onComplete={handleLandingComplete} />;
  }

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

      {/* Newsletter Modal - shows on first visit AFTER landing sequence */}
      <NewsletterModal 
        isVisible={isNewsletterVisible}
        onClose={hideNewsletterModal}
      />
    </div>
  );
} 