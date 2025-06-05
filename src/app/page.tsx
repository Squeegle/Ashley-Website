import { HomeHero } from "@/components/layout";
import { Section } from "@/components/layout";
import Link from "next/link";
import { ArrowRight, Instagram, Calendar, Clock } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogPost } from "@/types";

/**
 * Homepage - Ashley Rose Interior Design & Lifestyle
 * Features the main hero section, about section, recent blogs, recent work,
 * and Instagram section in the style of chrislovesjulia.com
 */
export default async function Home() {
  // Fetch recent blog posts for the homepage
  const { posts: recentBlogs } = await getAllBlogPosts({ limit: 3 });

  return (
    <div>
      {/* Hero Section - Large image with overlaid text */}
      <HomeHero />

      {/* About Section - Hi, I'm Ashley Rose */}
      <Section spacing="large" background="gray">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-contrast mb-6">
              Hi, I&apos;m Ashley Rose
            </h2>
            <div className="space-y-4 text-body-large leading-relaxed">
              <p className="text-contrast font-medium">
                I believe that your home should tell your story—every room should reflect 
                who you are and how you live. With over 8 years of experience in interior 
                design, I specialize in creating spaces that are both beautiful and deeply personal.
              </p>
              <p className="text-contrast font-medium">
                My approach combines timeless design principles with fresh, contemporary touches, 
                ensuring your space feels collected rather than decorated. I love mixing high and 
                low pieces, vintage finds with modern furniture, and always prioritize function 
                alongside beauty.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white dark-button-text rounded-md hover:bg-gray-800 transition-colors duration-200 font-semibold"
              >
                Learn More About Me
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-md hover:border-gray-800 hover:bg-gray-900 hover:text-white transition-colors duration-200 font-semibold"
              >
                <Instagram className="w-4 h-4" />
                Follow My Journey
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-96 md:h-[32rem] rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👩‍🎨</div>
                <p className="text-sm font-semibold text-contrast">Ashley Rose Portrait</p>
                <p className="text-xs text-contrast font-medium">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Recent Blogs Section - Staggered Layout */}
      <Section spacing="large">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-contrast mb-4">
            Recent Blogs
          </h2>
          <p className="text-body-large max-w-3xl mx-auto text-contrast font-medium">
            Discover the latest interior design tips, DIY tutorials, and lifestyle inspiration 
            to help you create the home of your dreams.
          </p>
        </div>

        {/* Staggered Grid Layout for 3 Recent Blogs - Inspired by Chris Loves Julia */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {recentBlogs.map((blog, index) => (
              <StaggeredBlogCard
                key={blog.id}
                blog={blog}
                variant={index === 0 ? 'large' : index === 1 ? 'tall' : 'medium'}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-semibold"
          >
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      {/* Instagram Section */}
      <Section spacing="medium">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-contrast mb-4">
            Follow Along
          </h2>
          <p className="text-body-large mb-8 text-contrast font-medium">
            Get daily design inspiration and behind-the-scenes glimpses on Instagram
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold"
          >
            <Instagram className="w-5 h-5" />
            @ashleyrose.design
          </Link>
        </div>

        {/* Instagram Grid Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/**
 * Staggered Blog Card Component - Creates Chris Loves Julia style layout
 * Supports different variants: large, tall, medium for staggered positioning
 */
interface StaggeredBlogCardProps {
  blog: BlogPost;
  variant: 'large' | 'tall' | 'medium';
}

function StaggeredBlogCard({ blog, variant }: StaggeredBlogCardProps) {
  // Format the published date to a readable format
  const formattedDate = blog.publishedAt.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Define grid positioning and sizing based on variant to match reference layout
  const getVariantClasses = () => {
    switch (variant) {
      case 'large':
        // Main featured card - spans 7 columns, takes up most of left side
        return 'lg:col-span-7 lg:row-span-2';
      case 'tall':
        // Tall card - spans 5 columns on right, full height
        return 'lg:col-span-5 lg:row-span-2';
      case 'medium':
        // Medium card - spans 5 columns, positioned below tall card on mobile, alongside on desktop
        return 'lg:col-span-5 lg:row-span-1 lg:col-start-8';
      default:
        return 'lg:col-span-4';
    }
  };

  // Define image height based on variant to match reference proportions
  const getImageHeight = () => {
    switch (variant) {
      case 'large':
        return 'h-80 lg:h-96';
      case 'tall':
        return 'h-64 lg:h-80';
      case 'medium':
        return 'h-48 lg:h-64';
      default:
        return 'h-64';
    }
  };

  // Define text sizing to match reference hierarchy
  const getTitleSize = () => {
    switch (variant) {
      case 'large':
        return 'text-2xl lg:text-4xl';
      case 'tall':
        return 'text-xl lg:text-2xl';
      case 'medium':
        return 'text-lg lg:text-xl';
      default:
        return 'text-lg';
    }
  };

  // Define content padding based on card size
  const getPadding = () => {
    switch (variant) {
      case 'large':
        return 'p-6 lg:p-10';
      case 'tall':
        return 'p-6 lg:p-8';
      case 'medium':
        return 'p-4 lg:p-6';
      default:
        return 'p-6';
    }
  };

  return (
    <Link href={`/blog/${blog.slug}`} className={`group ${getVariantClasses()}`}>
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 h-full flex flex-col staggered-card-transition">
        <div className={`relative overflow-hidden ${getImageHeight()}`}>
          <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
            <div className="text-center text-stone-400">
              <div className="text-3xl mb-3">📷</div>
              <p className="text-sm font-medium">Featured Image</p>
              <p className="text-xs">Coming Soon</p>
            </div>
          </div>
          {/* Placeholder for actual image */}
          {/* <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          /> */}
          
          {/* Elegant overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className={`flex-1 flex flex-col ${getPadding()}`}>
          <h3 className={`font-serif text-stone-800 mb-4 group-hover:text-stone-900 transition-colors duration-300 leading-tight ${getTitleSize()}`}>
            {blog.title}
          </h3>
          
          {/* Show excerpt for all variants, but longer for large */}
          <p className={`text-stone-600 leading-relaxed mb-6 flex-1 ${
            variant === 'large' ? 'text-base lg:text-lg line-clamp-4' : 
            variant === 'tall' ? 'text-sm lg:text-base line-clamp-6' : 
            'text-sm line-clamp-3'
          }`}>
            {blog.excerpt}
          </p>
          
          {/* Read more link styled like the reference */}
          <div className="mt-auto">
            <span className="inline-flex items-center text-stone-500 text-sm font-medium italic hover:text-stone-700 transition-colors duration-300">
              read more
            </span>
          </div>
          
          {/* Metadata at bottom */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
            <div className="flex items-center gap-3 text-xs text-stone-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{blog.readTime} min read</span>
              </div>
            </div>
            
            {/* Tags - show fewer for smaller cards */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {blog.tags.slice(0, variant === 'large' ? 2 : 1).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-stone-100 text-stone-500 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {blog.tags.length > (variant === 'large' ? 2 : 1) && (
                  <span className="px-2 py-1 bg-stone-100 text-stone-500 text-xs rounded-full">
                    +{blog.tags.length - (variant === 'large' ? 2 : 1)}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
