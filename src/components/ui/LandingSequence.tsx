'use client';

import { useEffect, useState } from 'react';
import { Home } from 'lucide-react'; // Placeholder Icon

interface LandingSequenceProps {
  onComplete: () => void;
}

// Define the duration for each page and fades
const NAME_PAGE_VISIBLE_DURATION = 2000; // 2 seconds for name page to be visible
const ICON_PAGE_VISIBLE_DURATION = 1500; // 1.5 seconds for icon page to be visible
const FADE_DURATION = 500; // 0.5 seconds for fade in/out

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
    backgroundColor: 'white', // Or your site's background color
    zIndex: 100, // Ensure it's on top
    transition: `opacity ${FADE_DURATION}ms ease-in-out`,
  };

  const textStyle: React.CSSProperties = {
    fontSize: '3rem', // Adjust as needed
    fontWeight: 'bold',
    color: 'black', // Adjust as needed
    textAlign: 'center',
  };

  const iconStyle: React.CSSProperties = {
    color: 'black', // Adjust as needed
  };
  
  if (step === 5) return null; // Sequence finished, render nothing

  // Determine opacity for Name Page
  let namePageOpacity = 0;
  if (step === 0 || step === 1) namePageOpacity = 1; // Fading in or fully visible
  if (step === 2) namePageOpacity = 0; // Fading out

  // Determine opacity for Icon Page
  let iconPageOpacity = 0;
  if (step === 2 || step === 3) iconPageOpacity = 1; // Fading in or fully visible
  if (step === 4) iconPageOpacity = 0; // Fading out

  return (
    <>
      {/* Name Page */}
      {(step <= 2) && ( // Render name page until it has faded out (step 2 completes its fade)
        <div 
          style={{
            ...pageStyle,
            opacity: (step === 1) ? 1 : ((step === 0 || step === 2) ? 0 : 0), // Fade in at step 0, fully visible at 1, fade out at 2
            // More precise opacity control for smoother transitions:
            // opacity: step === 0 ? 1 : (step === 1 ? 1 : (step === 2 ? 0 : 0)),
            // For a simple fade in then fade out, this can be tricky with shared step for transition
            // Let's use a simpler model: page is visible or not during its steps.
            // Opacity is controlled by overall container fade for simplicity now.
            // To do individual fade in/out of pages, more states or more complex style logic needed.
            // Let's refine this part. The outer div will handle the fade out of the entire sequence for now.
            // The individual pages will appear/disappear based on step.
          }}
        >
          {(step === 0 || step === 1) && (
            <div 
              style={{
                ...pageStyle,
                opacity: step === 1 ? 1 : 0, // Name page content opacity
                transition: `opacity ${FADE_DURATION}ms ease-in-out ${step === 0 ? '0ms' : '0ms'}`,
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
              opacity: step === 3 ? 1 : 0, // Icon page content opacity
              transition: `opacity ${FADE_DURATION}ms ease-in-out ${step === 2 ? '0ms' : '0ms'}`,
            }}
          >
            <div style={iconStyle}>
              <Home size={64} /> {/* Placeholder icon, adjust size as needed */}
            </div>
        </div>
      )}
    </>
  );
} 