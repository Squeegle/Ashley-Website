import Image from 'next/image';
import Link from 'next/link';

/**
 * Hero Component - Large featured image sections with overlaid content
 * Features:
 * - Full-width responsive images
 * - Overlaid text with various positioning options
 * - Call-to-action buttons
 * - Multiple layout variants
 * - Perfect for blog headers, page banners, and featured content
 */

interface HeroProps {
  // Image properties
  imageSrc: string;
  imageAlt: string;
  
  // Content
  title?: string;
  subtitle?: string;
  description?: string;
  
  // Call to action
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  
  // Layout options
  height?: 'small' | 'medium' | 'large' | 'full';
  textPosition?: 'center' | 'left' | 'right' | 'bottom-left' | 'bottom-center';
  overlay?: 'none' | 'light' | 'dark' | 'gradient';
  textColor?: 'white' | 'dark';
}

export default function Hero({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  height = 'large',
  textPosition = 'center',
  overlay = 'light',
  textColor = 'white'
}: HeroProps) {
  // Height classes mapping
  const heightClasses = {
    small: 'h-64 md:h-80',
    medium: 'h-80 md:h-96',
    large: 'h-96 md:h-[32rem] lg:h-[40rem]',
    full: 'h-screen'
  };

  // Text position classes
  const positionClasses = {
    center: 'items-center justify-center text-center',
    left: 'items-center justify-start text-left pl-8 md:pl-16',
    right: 'items-center justify-end text-right pr-8 md:pr-16',
    'bottom-left': 'items-end justify-start text-left pl-8 md:pl-16 pb-12 md:pb-16',
    'bottom-center': 'items-end justify-center text-center pb-12 md:pb-16'
  };

  // Overlay classes
  const overlayClasses = {
    none: '',
    light: 'bg-black bg-opacity-20',
    dark: 'bg-black bg-opacity-50',
    gradient: 'bg-gradient-to-t from-black via-transparent to-transparent'
  };

  // Text color classes
  const textColorClasses = {
    white: 'text-white',
    dark: 'text-gray-900'
  };

  return (
    <section className={`relative ${heightClasses[height]} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      {overlay !== 'none' && (
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      )}

      {/* Content */}
      <div className={`relative h-full flex ${positionClasses[textPosition]}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Subtitle */}
            {subtitle && (
              <p className={`text-sm md:text-base font-medium uppercase tracking-wide ${textColorClasses[textColor]} mb-2 md:mb-4`}>
                {subtitle}
              </p>
            )}

            {/* Title */}
            {title && (
              <h1 className={`text-3xl md:text-5xl lg:text-6xl font-serif ${textColorClasses[textColor]} mb-4 md:mb-6 leading-tight font-semibold text-shadow`}>
                {title}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p className={`text-base md:text-lg ${textColorClasses[textColor]} mb-6 md:mb-8 leading-relaxed max-w-2xl font-medium text-shadow-sm`}>
                {description}
              </p>
            )}

            {/* Call to Action Buttons */}
            {(ctaText || secondaryCtaText) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {ctaText && ctaLink && (
                  <Link
                    href={ctaLink}
                    className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200 shadow-lg"
                  >
                    {ctaText}
                  </Link>
                )}
                
                {secondaryCtaText && secondaryCtaLink && (
                  <Link
                    href={secondaryCtaLink}
                    className={`inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 ${
                      textColor === 'white' 
                        ? 'border-white text-white hover:bg-white hover:text-gray-900' 
                        : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                    } font-medium rounded-md transition-colors duration-200`}
                  >
                    {secondaryCtaText}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Hero Section Variants for common use cases
 */

// Homepage Hero
export function HomeHero() {
  return (
    <div className="relative h-96 md:h-[32rem] lg:h-[40rem] overflow-hidden bg-gray-100 flex items-center justify-center">
      {/* Placeholder background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300"></div>
      
      {/* Content */}
      <div className="relative text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-4 md:mb-6 leading-tight font-bold">
            Creating Spaces That Tell Your Story
          </h1>
          <p className="text-base md:text-lg text-gray-800 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto font-semibold">
            Transform your home into a reflection of your personality with thoughtful design, curated aesthetics, and functional beauty.
          </p>
        </div>
      </div>
    </div>
  );
}

// Blog Post Hero
export function BlogHero({ 
  title, 
  subtitle, 
  imageSrc, 
  imageAlt 
}: { 
  title: string; 
  subtitle?: string; 
  imageSrc: string; 
  imageAlt: string; 
}) {
  return (
    <Hero
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      subtitle={subtitle}
      title={title}
      height="medium"
      textPosition="bottom-left"
      overlay="gradient"
    />
  );
}

// Page Banner
export function PageBanner({ 
  title, 
  description, 
  imageSrc, 
  imageAlt 
}: { 
  title: string; 
  description?: string; 
  imageSrc: string; 
  imageAlt: string; 
}) {
  return (
    <Hero
      imageSrc={imageSrc}
      imageAlt={imageAlt}
      title={title}
      description={description}
      height="medium"
      textPosition="center"
      overlay="dark"
      textColor="white"
    />
  );
} 