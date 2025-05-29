import { useState, useEffect } from 'react';

/**
 * Custom hook to manage newsletter modal state
 * Features:
 * - Shows modal after a 2-second delay on first visit
 * - Shows only once per visit (session-based)
 * - Provides functions to show/hide modal
 * - Clean and simple implementation
 */
export function useNewsletterModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownOnLoad, setHasShownOnLoad] = useState(false);

  /**
   * Show the modal manually
   */
  const showModal = (): void => {
    setIsVisible(true);
  };

  /**
   * Hide the modal
   */
  const hideModal = (): void => {
    setIsVisible(false);
  };

  /**
   * Effect to show modal after 2-second delay on first visit
   * Only shows once per session (page load)
   */
  useEffect(() => {
    if (hasShownOnLoad) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasShownOnLoad(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, [hasShownOnLoad]);

  return {
    isVisible,
    showModal,
    hideModal
  };
} 