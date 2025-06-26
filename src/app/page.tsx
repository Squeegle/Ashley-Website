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

      {/* Recent Blogs Section - Vertical Alternating Layout */}
      <Section spacing="large" background="white">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-contrast mb-4">
            Recent Blogs
          </h2>
          <p className="text-body-large max-w-3xl mx-auto text-contrast font-medium">
            Discover the latest interior design tips, DIY tutorials, and lifestyle inspiration 
            to help you create the home of your dreams.
          </p>
        </div>

        {/* Recent Blogs Section - Vertical Alternating Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12 lg:space-y-16">
            {recentBlogs.map((blog, index) => (
              <div key={blog.id}>
                <AlternatingBlogCard
                  blog={blog}
                  isReversed={index % 2 === 1}
                />
                {index < recentBlogs.length - 1 && (
                  <div className="mt-12 lg:mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 h-[1px] bg-secondary"></div>
                  </div>
                )}
              </div>
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

      {/* About Section - Hi, I'm Ashley Rose */}
      <Section spacing="large" background="secondary">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif !text-primary mb-6">
              Hi, I&apos;m Ashley Rose
            </h2>
            <div className="space-y-4 text-body-large leading-relaxed">
              <p className="!text-primary font-medium">
                Hi, I&apos;m Ashley Rose—a content creator, home decor enthusiast, and mom of four based in Canada. I share real-life moments from our ever-evolving home, mixing DIY projects, second-hand finds, and everyday chaos into something that feels both beautiful and lived in. What started as documenting our home renovation journey has grown into a space where I get to connect with others who love making their homes feel like theirs, even if it&apos;s a little messy along the way.
              </p>
              <p className="!text-primary font-medium">
                I believe in progress over perfection, that personality matters more than polish, and that the stories behind the spaces are what truly make them special. Whether it&apos;s a room refresh, a late-night brainstorm, or one of those &quot;I didn&apos;t plan to do this today&quot; kind of projects—I&apos;m here for all of it. Welcome to my corner of the internet.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white dark-button-text rounded-md hover:bg-gray-800 transition-colors duration-200 font-semibold"
              >
                Learn More About Me
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-96 md:h-[32rem] rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">👩‍🎨</div>
                <p className="text-sm font-semibold !text-primary">Ashley Rose Portrait</p>
                <p className="text-xs !text-primary font-medium">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Instagram Section */}
      <Section spacing="medium" background="white">
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
 * Alternating Blog Card Component - Creates vertical alternating layouts
 * Each blog alternates between image-left/text-right and text-left/image-right
 */
interface AlternatingBlogCardProps {
  blog: BlogPost;
  isReversed: boolean;
}

function AlternatingBlogCard({ blog, isReversed }: AlternatingBlogCardProps) {
  // Format the published date to a readable format
  const formattedDate = blog.publishedAt.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <article className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] alternating-card-transition ${
        isReversed ? 'lg:direction-reverse' : ''
      }`}>
        
        {/* Image Section */}
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200 aspect-[4/3] ${
          isReversed ? 'lg:order-2' : 'lg:order-1'
        }`}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-stone-400">
              <div className="text-4xl mb-4">📷</div>
              <p className="text-lg font-medium">Featured Image</p>
              <p className="text-sm">Coming Soon</p>
            </div>
          </div>
          {/* Placeholder for actual image */}
          {/* <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
          /> */}
          
          {/* Subtle overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content Section */}
        <div className={`flex flex-col justify-center space-y-6 ${
          isReversed ? 'lg:order-1 lg:text-right' : 'lg:order-2 lg:text-left'
        }`}>
          
          {/* Blog metadata */}
          <div className={`flex items-center gap-4 text-sm text-stone-500 ${
            isReversed ? 'lg:justify-end' : 'lg:justify-start'
          }`}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          {/* Blog title */}
          <h3 className="text-3xl lg:text-4xl font-serif text-stone-800 group-hover:text-stone-900 transition-colors duration-300 leading-tight">
            {blog.title}
          </h3>

          {/* Blog excerpt */}
          <p className="text-lg text-stone-600 leading-relaxed line-clamp-4">
            {blog.excerpt}
          </p>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className={`flex flex-wrap gap-2 ${
              isReversed ? 'lg:justify-end' : 'lg:justify-start'
            }`}>
              {blog.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-stone-100 text-stone-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
              {blog.tags.length > 3 && (
                <span className="px-3 py-1 bg-stone-100 text-stone-600 text-sm rounded-full">
                  +{blog.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Read more link */}
          <div className={`${isReversed ? 'lg:text-right' : 'lg:text-left'}`}>
            <span className="inline-flex items-center text-stone-500 text-lg font-medium italic hover:text-stone-700 transition-colors duration-300 group-hover:text-stone-700">
              {isReversed && (
                <ArrowRight className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300 rotate-180" />
              )}
              read more
              {!isReversed && (
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              )}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
