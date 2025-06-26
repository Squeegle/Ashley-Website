import { ReactNode } from 'react';

/**
 * Grid Layout Components - Flexible responsive grid system
 * Features:
 * - Multiple grid layouts (2, 3, 4 columns)
 * - Responsive breakpoints
 * - Masonry-style layout option
 * - Blog post grid
 * - Gallery grid
 * - Content cards
 */

interface GridProps {
  children: ReactNode;
  columns?: {
    mobile?: 1 | 2;
    tablet?: 2 | 3 | 4;
    desktop?: 2 | 3 | 4 | 5;
  };
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Main Grid Component - Flexible responsive grid
 */
export default function Grid({ 
  children, 
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'medium',
  className = ''
}: GridProps) {
  // Gap classes
  const gapClasses = {
    small: 'gap-4',
    medium: 'gap-6 md:gap-8',
    large: 'gap-8 md:gap-12'
  };

  // Column classes - responsive
  const getColumnClasses = () => {
    const { mobile = 1, tablet = 2, desktop = 3 } = columns;
    
    const mobileClass = `grid-cols-${mobile}`;
    const tabletClass = `md:grid-cols-${tablet}`;
    const desktopClass = `lg:grid-cols-${desktop}`;
    
    return `${mobileClass} ${tabletClass} ${desktopClass}`;
  };

  return (
    <div className={`grid ${getColumnClasses()} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Blog Post Grid - Specifically designed for blog post previews
 */
interface BlogGridProps {
  children: ReactNode;
  featured?: boolean; // First post larger
  className?: string;
}

export function BlogGrid({ children, featured = false, className = '' }: BlogGridProps) {
  if (featured) {
    // Featured layout: first post full width, others in grid
    const childrenArray = Array.isArray(children) ? children : [children];
    const [firstChild, ...restChildren] = childrenArray;

    return (
      <div className={`space-y-8 md:space-y-12 ${className}`}>
        {/* Featured post - full width */}
        {firstChild && (
          <div className="w-full">
            {firstChild}
          </div>
        )}
        
        {/* Regular grid for remaining posts */}
        {restChildren.length > 0 && (
          <Grid
            columns={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap="large"
          >
            {restChildren}
          </Grid>
        )}
      </div>
    );
  }

  // Standard blog grid
  return (
    <Grid
      columns={{ mobile: 1, tablet: 2, desktop: 3 }}
      gap="large"
      className={className}
    >
      {children}
    </Grid>
  );
}

/**
 * Gallery Grid - For image galleries with responsive sizing
 */
interface GalleryGridProps {
  children: ReactNode;
  variant?: 'masonry' | 'uniform';
  columns?: {
    mobile?: 1 | 2;
    tablet?: 2 | 3 | 4;
    desktop?: 2 | 3 | 4 | 5;
  };
  className?: string;
}

export function GalleryGrid({ 
  children, 
  variant = 'uniform',
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  className = ''
}: GalleryGridProps) {
  if (variant === 'masonry') {
    // Masonry layout using CSS columns
    const { mobile = 1, tablet = 2, desktop = 3 } = columns;
    
    return (
      <div 
        className={`
          columns-${mobile} 
          md:columns-${tablet} 
          lg:columns-${desktop} 
          gap-4 md:gap-6 
          space-y-4 md:space-y-6 
          ${className}
        `}
      >
        {children}
      </div>
    );
  }

  // Uniform grid layout
  return (
    <Grid 
      columns={columns}
      gap="medium"
      className={className}
    >
      {children}
    </Grid>
  );
}

/**
 * Content Sections Grid - For homepage sections, services, etc.
 */
interface ContentGridProps {
  children: ReactNode;
  centered?: boolean;
  maxColumns?: 2 | 3 | 4;
  className?: string;
}

export function ContentGrid({ 
  children, 
  centered = false,
  maxColumns = 3,
  className = ''
}: ContentGridProps) {
  const centerClass = centered ? 'mx-auto justify-center' : '';
  
  const columnConfig: {
    [key: number]: {
      mobile: 1 | 2;
      tablet: 2 | 3 | 4;
      desktop: 2 | 3 | 4 | 5;
    }
  } = {
    2: { mobile: 1, tablet: 2, desktop: 2 },
    3: { mobile: 1, tablet: 2, desktop: 3 },
    4: { mobile: 1, tablet: 2, desktop: 4 }
  };

  return (
    <div className={centerClass}>
      <Grid
        columns={columnConfig[maxColumns]}
        gap="large"
        className={className}
      >
        {children}
      </Grid>
    </div>
  );
}

/**
 * Container Component - Provides consistent max-width and padding
 */
interface ContainerProps {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  padding?: boolean;
  className?: string;
}

export function Container({ 
  children, 
  size = 'large',
  padding = true,
  className = ''
}: ContainerProps) {
  // Size classes
  const sizeClasses = {
    small: 'max-w-4xl',
    medium: 'max-w-6xl',
    large: 'max-w-7xl',
    full: 'max-w-none'
  };

  const paddingClass = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  return (
    <div className={`${sizeClasses[size]} mx-auto ${paddingClass} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section Component - For page sections with consistent spacing
 */
interface SectionProps {
  children: ReactNode;
  spacing?: 'small' | 'medium' | 'large';
  background?: 'white' | 'gray' | 'secondary' | 'none';
  className?: string;
}

export function Section({ 
  children, 
  spacing = 'large',
  background = 'none',
  className = ''
}: SectionProps) {
  // Spacing classes
  const spacingClasses = {
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-16',
    large: 'py-16 md:py-24'
  };

  // Background classes
  const backgroundClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    secondary: 'bg-secondary',
    none: ''
  };

  return (
    <section className={`${spacingClasses[spacing]} ${backgroundClasses[background]} ${className}`}>
      <Container>
        {children}
      </Container>
    </section>
  );
} 