import { BlogPost } from '@/types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Blog Data Management Library
 * Handles loading, parsing, and filtering of markdown blog posts
 * Features:
 * - Markdown file parsing with frontmatter
 * - Category and search filtering
 * - Pagination support
 * - Automatic excerpt generation
 * - Read time calculation
 */

// Path to blog posts directory
const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog');

/**
 * Ensure blog directory exists, create sample posts if it doesn't
 */
function ensureBlogDirectory() {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    fs.mkdirSync(POSTS_DIRECTORY, { recursive: true });
    createSamplePosts();
  }
}

/**
 * Create sample blog posts for demonstration
 */
function createSamplePosts() {
  const samplePosts = [
    {
      filename: '2024-01-15-living-room-makeover.md',
      content: `---
title: "Cozy Living Room Makeover on a Budget"
excerpt: "Transform your living space with these simple, budget-friendly tips that will make a huge impact without breaking the bank."
featuredImage: "/images/blog/living-room-makeover.jpg"
publishedAt: "2024-01-15"
tags: ["decor", "before-after", "budget"]
author: "Ashley Rose"
readTime: 5
---

# Cozy Living Room Makeover on a Budget

Creating a beautiful, cozy living space doesn't have to cost a fortune. With some strategic planning and creative thinking, you can transform your living room into a stylish sanctuary that reflects your personality.

## The Before

Our living room was feeling tired and outdated. The beige walls made everything feel flat, and the furniture arrangement wasn't working for our lifestyle.

## Key Changes We Made

### 1. Paint Makes All the Difference
We chose a warm, sophisticated gray that instantly made the space feel more modern and cozy.

### 2. Rearranged for Better Flow
Moving the sofa to face the fireplace created a more intimate conversation area.

### 3. Added Texture and Warmth
- Layered throw pillows in complementary colors
- Added a chunky knit throw
- Introduced a jute rug for natural texture

## The Results

The transformation was incredible! The room now feels warm, inviting, and perfectly suited to our family's needs. Best of all, we stayed under budget and completed everything in one weekend.

*What's your favorite budget decorating tip? Share in the comments below!*
`
    },
    {
      filename: '2024-01-10-diy-coffee-table.md',
      content: `---
title: "DIY Farmhouse Coffee Table Tutorial"
excerpt: "Learn how to build a beautiful farmhouse-style coffee table with step-by-step instructions and a complete materials list."
featuredImage: "/images/blog/diy-coffee-table.jpg"
publishedAt: "2024-01-10"
tags: ["diy", "furniture", "tutorial"]
author: "Ashley Rose"
readTime: 8
---

# DIY Farmhouse Coffee Table Tutorial

Building your own coffee table is easier than you might think! This farmhouse-style table is perfect for beginners and can be completed in a weekend.

## Materials Needed

- 2x4 lumber (8 pieces)
- 1x6 boards for the top (5 pieces)
- Wood screws
- Wood stain or paint
- Sandpaper
- Drill

## Tools Required

- Miter saw or circular saw
- Drill/driver
- Measuring tape
- Level
- Safety glasses

## Step-by-Step Instructions

### Step 1: Cut Your Wood
Start by cutting all your pieces to length according to the cut list...

### Step 2: Build the Frame
Assemble the base frame using wood screws...

### Step 3: Attach the Top
Secure the tabletop boards to the frame...

### Step 4: Sand and Finish
Sand everything smooth and apply your chosen finish...

## Final Thoughts

This coffee table project is perfect for adding a personal touch to your living space. The farmhouse style works with many different decor aesthetics, and the sturdy construction means it will last for years to come.

*Have you tried any DIY furniture projects? I'd love to see your creations!*
`
    },
    {
      filename: '2024-01-05-spring-decor-trends.md',
      content: `---
title: "Spring Decor Trends to Try This Year"
excerpt: "Discover the hottest spring decorating trends that will breathe new life into your home and help you embrace the season."
featuredImage: "/images/blog/spring-decor-trends.jpg"
publishedAt: "2024-01-05"
tags: ["inspiration", "decor", "seasonal"]
author: "Ashley Rose"
readTime: 6
---

# Spring Decor Trends to Try This Year

As winter fades away, it's time to refresh our homes and embrace the energy of spring! Here are the top decorating trends I'm loving this season.

## 1. Earthy Green Tones

This year, we're moving beyond sage green to deeper, more complex earth tones. Think forest green, olive, and deep moss colors.

## 2. Natural Textures

Bringing the outdoors in is more popular than ever:
- Woven grass baskets
- Raw wood elements
- Stone and ceramic accessories
- Linen and hemp textiles

## 3. Curved Furniture

Soft, organic shapes are having a major moment. Look for:
- Round dining tables
- Curved sofas and chairs
- Organic-shaped mirrors
- Flowing light fixtures

## 4. Maximalist Gallery Walls

Gone are the days of minimalist art. This spring is all about:
- Layered artwork
- Mixed frame styles
- Personal photographs
- Vintage finds and prints

## 5. Sustainable Materials

Eco-consciousness is driving design choices:
- Reclaimed wood furniture
- Recycled glass accessories
- Vintage and antique pieces
- Locally-made ceramics

## How to Incorporate These Trends

You don't need to overhaul your entire home! Start small with accessories, textiles, or a single statement piece.

*Which trend are you most excited to try? Let me know in the comments!*
`
    }
  ];

  samplePosts.forEach(post => {
    const filePath = path.join(POSTS_DIRECTORY, post.filename);
    fs.writeFileSync(filePath, post.content);
  });
}

/**
 * Calculate estimated read time based on word count
 */
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate excerpt from content if not provided in frontmatter
 */
function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown syntax for cleaner excerpt
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  return cleanContent.substring(0, maxLength).trim() + '...';
}

/**
 * Parse a single markdown file into a BlogPost object
 */
function parseMarkdownFile(filePath: string): BlogPost | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Extract slug from filename
    const filename = path.basename(filePath, '.md');
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, ''); // Remove date prefix if present

    // Parse date
    const publishedAt = data.publishedAt ? new Date(data.publishedAt) : new Date();

    // Generate excerpt if not provided
    const excerpt = data.excerpt || generateExcerpt(content);

    // Calculate read time if not provided
    const readTime = data.readTime || calculateReadTime(content);

    return {
      id: slug,
      title: data.title || 'Untitled',
      excerpt,
      content,
      featuredImage: data.featuredImage || '/images/blog/default.jpg',
      publishedAt,
      slug,
      tags: data.tags || [],
      author: data.author || 'Ashley Rose',
      readTime,
    };
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all blog posts with optional filtering and pagination
 */
export async function getAllBlogPosts(options: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
  ensureBlogDirectory();

  const {
    category,
    search,
    page = 1,
    limit = 10,
  } = options;

  try {
    // Read all markdown files from the posts directory
    const filenames = fs.readdirSync(POSTS_DIRECTORY)
      .filter(name => name.endsWith('.md'));

    // Parse all posts
    let posts: BlogPost[] = filenames
      .map(filename => parseMarkdownFile(path.join(POSTS_DIRECTORY, filename)))
      .filter((post): post is BlogPost => post !== null);

    // Sort by published date (newest first)
    posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    // Apply category filter
    if (category) {
      posts = posts.filter(post => 
        post.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
      );
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Calculate pagination
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      totalPosts,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return {
      posts: [],
      totalPosts: 0,
      totalPages: 0,
      currentPage: page,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  ensureBlogDirectory();

  try {
    const filenames = fs.readdirSync(POSTS_DIRECTORY)
      .filter(name => name.endsWith('.md'));

    for (const filename of filenames) {
      const post = parseMarkdownFile(path.join(POSTS_DIRECTORY, filename));
      if (post && post.slug === slug) {
        return post;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get related posts based on tags
 */
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const { posts } = await getAllBlogPosts();
  
  // Filter out the current post and find posts with matching tags
  const relatedPosts = posts
    .filter(post => post.id !== currentPost.id)
    .map(post => ({
      post,
      matchCount: post.tags.filter(tag => currentPost.tags.includes(tag)).length
    }))
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map(({ post }) => post);

  // If we don't have enough related posts, fill with recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = posts
      .filter(post => post.id !== currentPost.id)
      .filter(post => !relatedPosts.some(related => related.id === post.id))
      .slice(0, limit - relatedPosts.length);
    
    relatedPosts.push(...recentPosts);
  }

  return relatedPosts;
} 