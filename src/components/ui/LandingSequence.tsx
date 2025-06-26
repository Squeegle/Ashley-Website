'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LandingSequenceProps {
  onComplete: () => void;
}

// Define the duration for each page and fades
const NAME_PAGE_VISIBLE_DURATION = 800; // Reduced from 2000ms to 800ms (60% faster)
const ICON_PAGE_VISIBLE_DURATION = 600; // Reduced from 1500ms to 600ms (60% faster)
const FADE_DURATION = 300; // Reduced from 500ms to 300ms (40% faster)

export default function LandingSequence({ onComplete }: LandingSequenceProps) {
  // Steps:
  // 0: Initial (pre-name page, name page fading in)
  // 1: Name page fully visible
  // 2: Name page fading out, icon page fading in
  // 3: Icon page fully visible
  // 4: Icon page fading out
  // 5: Sequence complete
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    switch (step) {
      case 0: // Initial delay before Name page is fully visible
        timer = setTimeout(() => setStep(1), FADE_DURATION); // Time for name to fade in
        break;
      case 1: // Name page is visible, wait, then start fading out name / fading in icon
        timer = setTimeout(() => setStep(2), NAME_PAGE_VISIBLE_DURATION);
        break;
      case 2: // Transitioning from Name to Icon page (both fades happening)
        timer = setTimeout(() => setStep(3), FADE_DURATION); // Time for icon to fade in / name to fade out
        break;
      case 3: // Icon page is visible, wait, then start fading out icon
        timer = setTimeout(() => setStep(4), ICON_PAGE_VISIBLE_DURATION);
        break;
      case 4: // Icon page is fading out
        timer = setTimeout(() => {
          setStep(5);
          onComplete();
        }, FADE_DURATION);
        break;
      default:
        break;
    }

    return () => clearTimeout(timer);
  }, [step, onComplete]);

  const pageStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // Match icon's background color
    zIndex: 100,
    transition: `opacity ${FADE_DURATION}ms ease-in-out`,
  };

  const textStyle: React.CSSProperties = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#454140', // Primary color
    textAlign: 'center',
  };

  const iconContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '192px',
    height: '192px',
  };
  
  if (step === 5) return null; // Sequence finished, render nothing

  return (
    <>
      {/* Name Page */}
      {(step <= 2) && ( // Render name page until it has faded out (step 2 completes its fade)
        <div 
          style={{
            ...pageStyle,
            opacity: (step === 1) ? 1 : ((step === 0 || step === 2) ? 0 : 0),
          }}
        >
          {(step === 0 || step === 1) && (
            <div 
              style={{
                ...pageStyle,
                opacity: step === 1 ? 1 : 0,
                transition: `opacity ${FADE_DURATION}ms ease-in-out`,
              }}
            >
              <div style={textStyle}>At home with Rose</div>
            </div>
          )}
        </div>
      )}

      {/* Icon Page */}
      {(step >= 2 && step <= 4) && ( // Render icon page from its fade-in (step 2) until it fades out (step 4 completes)
         <div 
            style={{
              ...pageStyle,
              opacity: step === 3 ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms ease-in-out`,
            }}
          >
            <div style={iconContainerStyle}>
              <Image
                src="/icons/android-chrome-192x192.png"
                alt="At home with Rose"
                fill
                priority
                sizes="192px"
                style={{ objectFit: 'contain' }}
              />
            </div>
        </div>
      )}
    </>
  );
} 