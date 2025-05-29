import { HomeHero } from "@/components/layout";
import { Section } from "@/components/layout";
import Link from "next/link";
import { ArrowRight, Instagram, Calendar, Clock } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogPost } from "@/types";

/**
 * Homepage - Ashley Rose Interior Design & Lifestyle
 * Features the main hero section, recent blogs, recent work,
 * and about section in the style of chrislovesjulia.com
 */
export default async function Home() {
  // Fetch recent blog posts for the homepage
  const { posts: recentBlogs } = await getAllBlogPosts({ limit: 3 });

  return (
    <div>
      {/* Hero Section - Large image with overlaid text */}
      <HomeHero />

      {/* Recent Blogs Section */}
      <Section spacing="large" background="gray">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-contrast mb-4">
            Recent Blogs
          </h2>
          <p className="text-body-large max-w-3xl mx-auto text-contrast font-medium">
            Discover the latest interior design tips, DIY tutorials, and lifestyle inspiration 
            to help you create the home of your dreams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recentBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}
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

      {/* Featured Work Section */}
      <Section spacing="large">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-contrast mb-4">
            Recent Projects
          </h2>
          <p className="text-body-large max-w-3xl mx-auto text-contrast font-medium">
            Take a peek inside some of our favorite recent transformations, 
            where functionality meets beauty in every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ProjectCard
            image="/images/project-1.jpg"
            title="Modern Coastal Living Room"
            description="A serene space combining natural textures with contemporary comfort."
            link="/projects/modern-coastal-living-room"
          />
          <ProjectCard
            image="/images/project-2.jpg"
            title="Scandinavian Kitchen Remodel"
            description="Clean lines and warm woods create the perfect family gathering space."
            link="/projects/scandinavian-kitchen-refresh"
          />
          <ProjectCard
            image="/images/project-3.jpg"
            title="Bohemian Master Bedroom"
            description="A dreamy retreat featuring rich textures and curated vintage finds."
            link="/projects/bohemian-bedroom-makeover"
          />
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-semibold"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      {/* About Section */}
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
 * Project Card Component
 */
interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProjectCard({ image, title, description, link }: ProjectCardProps) {
  return (
    <Link href={link} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="relative h-64 overflow-hidden">
          <div className="w-full h-full bg-gray-200"></div>
          {/* Placeholder for actual image */}
          {/* <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          /> */}
        </div>
        <div className="p-6">
          <h3 className="text-lg font-serif text-contrast mb-2 group-hover:text-gray-800 transition-colors duration-200 font-medium">
            {title}
          </h3>
          <p className="text-contrast text-sm leading-relaxed font-medium">{description}</p>
        </div>
      </div>
    </Link>
  );
}

/**
 * Blog Card Component
 */
interface BlogCardProps {
  blog: BlogPost;
}

function BlogCard({ blog }: BlogCardProps) {
  // Format the published date to a readable format
  const formattedDate = blog.publishedAt.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Link href={`/blog/${blog.slug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="relative h-64 overflow-hidden">
          <div className="w-full h-full bg-gray-200"></div>
          {/* Placeholder for actual image */}
          {/* <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          /> */}
        </div>
        <div className="p-6">
          {/* Blog metadata */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{blog.readTime} min read</span>
            </div>
          </div>
          <h3 className="text-lg font-serif text-contrast mb-2 group-hover:text-gray-800 transition-colors duration-200 font-medium">
            {blog.title}
          </h3>
          <p className="text-contrast text-sm leading-relaxed font-medium mb-4">{blog.excerpt}</p>
          {/* Tags display */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {blog.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {blog.tags.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{blog.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
