import { useState, useEffect } from 'react';

/**
 * Interface for the options passable to useNewsletterModal
 */
interface UseNewsletterModalOptions {
  isReadyToShow?: boolean; // Optional: Controls when the timed display logic activates
}

/**
 * Custom hook to manage newsletter modal state
 * Features:
 * - Shows modal after a 2-second delay on first visit, if isReadyToShow is true
 * - Shows only once per visit (session-based)
 * - Provides functions to show/hide modal
 * - Clean and simple implementation
 */
export function useNewsletterModal(options?: UseNewsletterModalOptions) {
  const { isReadyToShow = true } = options || {}; // Default isReadyToShow to true for backward compatibility or if not provided
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownOnLoad, setHasShownOnLoad] = useState(false);

  /**
   * Show the modal manually
   */
  const showModal = (): void => {
    setIsVisible(true);
    setHasShownOnLoad(true); // If shown manually, also count it as shown on load for the session
  };

  /**
   * Hide the modal
   */
  const hideModal = (): void => {
    setIsVisible(false);
  };

  /**
   * Effect to show modal after 2-second delay on first visit
   * Only shows once per session (page load) and if isReadyToShow is true
   */
  useEffect(() => {
    // Only run the timer if it's ready to be shown and hasn't been shown on load yet
    if (!isReadyToShow || hasShownOnLoad) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasShownOnLoad(true);
    }, 2000); // Show after 2 seconds

    // Cleanup function to clear the timer if the component unmounts
    // or if isReadyToShow/hasShownOnLoad changes before the timer fires.
    return () => clearTimeout(timer);
  }, [isReadyToShow, hasShownOnLoad]); // Added isReadyToShow to the dependency array

  return {
    isVisible,
    showModal,
    hideModal
  };
} 