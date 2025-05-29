import { Project } from '@/types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Projects Data Management Library
 * Handles loading, parsing, and filtering of markdown project posts
 * Features:
 * - Markdown file parsing with frontmatter
 * - Category and search filtering
 * - Before/After image support
 * - Project metadata (timeline, budget, difficulty)
 * - Pagination support
 * - Automatic excerpt generation
 * - Read time calculation
 */

// Path to projects directory
const PROJECTS_DIRECTORY = path.join(process.cwd(), 'content/projects');

/**
 * Project categories for filtering
 */
export const PROJECT_CATEGORIES = [
  'All Projects',
  'Room Makeovers', 
  'DIY Projects',
  'Decor & Styling',
  'Organization',
  'Renovations',
  'Holiday & Seasonal',
  'Outdoor Projects'
];

/**
 * Ensure projects directory exists, create sample projects if it doesn't
 */
function ensureProjectsDirectory() {
  if (!fs.existsSync(PROJECTS_DIRECTORY)) {
    fs.mkdirSync(PROJECTS_DIRECTORY, { recursive: true });
    createSampleProjects();
  }
}

/**
 * Create sample projects for demonstration
 */
function createSampleProjects() {
  const sampleProjects = [
    {
      filename: '2024-01-20-modern-coastal-living-room.md',
      content: `---
title: "Modern Coastal Living Room Transformation"
excerpt: "A complete living room makeover that brings coastal vibes into a modern space with budget-friendly DIY solutions and smart design choices."
featuredImage: "/images/projects/coastal-living-after.jpg"
beforeImage: "/images/projects/coastal-living-before.jpg"
afterImage: "/images/projects/coastal-living-after.jpg"
publishedAt: "2024-01-20"
category: "Room Makeovers"
tags: ["coastal", "living room", "budget makeover", "DIY"]
author: "Ashley Rose"
readTime: 8
timeline: "3 weeks"
budget:
  min: 800
  max: 1200
  currency: "USD"
difficulty: "Intermediate"
materials: ["paint", "furniture", "textiles", "lighting", "accessories"]
roomType: "Living Room"
projectType: "Decor"
isBeforeAfter: true
---

# Modern Coastal Living Room Transformation

When we first moved into our home, the living room felt dark, cramped, and completely disconnected from our love of coastal living. The space had potential, but it needed a complete refresh to become the bright, airy sanctuary we envisioned.

## The Challenge

Our living room faced several challenges:
- Dark, outdated paint colors
- Heavy, mismatched furniture
- Poor lighting
- Lack of coastal character
- Limited budget for a complete overhaul

## The Vision

We wanted to create a modern coastal space that felt:
- Light and airy
- Comfortable for daily living
- Connected to nature
- Stylish but not overly precious
- Budget-friendly

## The Transformation Process

### Week 1: Planning and Prep
We started by creating a mood board and carefully measuring the space. The key was finding pieces that would work with our existing layout while completely changing the feel.

### Week 2: Paint and Major Changes
- Painted walls in a soft, warm white
- Replaced heavy curtains with light, flowing panels
- Rearranged furniture for better flow

### Week 3: Styling and Details
- Added coastal-inspired accessories
- Introduced natural textures
- Styled shelves and surfaces

## Key Design Elements

### Color Palette
We chose a palette of warm whites, soft blues, and natural wood tones that immediately made the space feel larger and brighter.

### Furniture Selection
Instead of buying all new furniture, we:
- Reupholstered the existing sofa in a light linen fabric
- Added a reclaimed wood coffee table
- Incorporated woven baskets for storage

### Lighting Strategy
- Replaced overhead lighting with table lamps and floor lamps
- Added string lights for ambient lighting
- Maximized natural light with lighter window treatments

### Coastal Touches
- Incorporated driftwood and sea glass accessories
- Added plants in woven baskets
- Used rope and natural fiber textures throughout

## The Results

The transformation exceeded our expectations! The room now feels like a peaceful coastal retreat while still being practical for everyday living. Friends and family can't believe it's the same space.

## Budget Breakdown
- Paint and supplies: $150
- Furniture reupholstering: $400
- New coffee table: $300
- Lighting: $200
- Accessories and decor: $250
- **Total: $1,300**

## Lessons Learned
- Paint truly is the most impactful change you can make
- Working with existing furniture saves money and adds character
- Lighting can completely change the mood of a space
- Natural textures add warmth and interest without breaking the budget

*What's your favorite coastal decorating element? I'd love to hear about your own room transformations!*
`
    },
    {
      filename: '2024-01-15-scandinavian-kitchen-refresh.md',
      content: `---
title: "Scandinavian Kitchen Refresh"
excerpt: "Transform your kitchen with clean lines, natural materials, and functional design inspired by Scandinavian style."
featuredImage: "/images/projects/scandi-kitchen-after.jpg"
beforeImage: "/images/projects/scandi-kitchen-before.jpg"
afterImage: "/images/projects/scandi-kitchen-after.jpg"
publishedAt: "2024-01-15"
category: "Room Makeovers"
tags: ["scandinavian", "kitchen", "minimalist", "organization"]
author: "Ashley Rose"
readTime: 6
timeline: "2 weeks"
budget:
  min: 500
  max: 800
  currency: "USD"
difficulty: "Beginner"
materials: ["paint", "hardware", "open shelving", "organizational tools"]
roomType: "Kitchen"
projectType: "Decor"
isBeforeAfter: true
---

# Scandinavian Kitchen Refresh

Our kitchen needed a fresh perspective. While functional, it lacked the clean, serene aesthetic we craved. Drawing inspiration from Scandinavian design principles, we created a space that's both beautiful and highly functional.

## Design Principles

### Functionality First
Every element serves a purpose while contributing to the overall aesthetic.

### Natural Materials
We incorporated wood, stone, and other natural elements throughout.

### Clean Lines
Simple, uncluttered surfaces create a sense of calm.

### Light and Bright
Maximizing both natural and artificial light was key.

## The Transformation

### Before: The Challenges
- Cluttered countertops
- Dark upper cabinets
- Poor organization
- Lack of personality

### After: The Solutions
- Open shelving for display and storage
- Light paint colors throughout
- Organized systems for everything
- Carefully curated accessories

## Key Changes Made

### 1. Cabinet Refresh
Instead of replacing cabinets, we:
- Painted upper cabinets white
- Added new brushed brass hardware
- Removed some upper doors for open shelving

### 2. Color Scheme
- Warm white walls
- Natural wood accents
- Black and brass details
- Lots of greenery

### 3. Organization Systems
- Installed pull-out drawers
- Added drawer dividers
- Created zones for different activities
- Displayed everyday items beautifully

## The Results

Our kitchen now feels like a peaceful, efficient workspace that we actually enjoy spending time in. The Scandinavian influence brings calm to our busy mornings and makes cooking feel more intentional.

*Have you tried Scandinavian design in your home? What elements do you love most?*
`
    },
    {
      filename: '2024-01-10-bohemian-bedroom-makeover.md',
      content: `---
title: "Bohemian Bedroom Sanctuary"
excerpt: "Create a dreamy bohemian bedroom retreat with layered textures, warm colors, and personal touches that inspire rest and creativity."
featuredImage: "/images/projects/boho-bedroom-after.jpg"
beforeImage: "/images/projects/boho-bedroom-before.jpg"
afterImage: "/images/projects/boho-bedroom-after.jpg"
publishedAt: "2024-01-10"
category: "Room Makeovers"
tags: ["bohemian", "bedroom", "textiles", "plants"]
author: "Ashley Rose"
readTime: 7
timeline: "1 weekend"
budget:
  min: 300
  max: 600
  currency: "USD"
difficulty: "Beginner"
materials: ["textiles", "plants", "lighting", "wall decor", "furniture"]
roomType: "Bedroom"
projectType: "Decor"
isBeforeAfter: true
---

# Bohemian Bedroom Sanctuary

Transforming our bedroom into a bohemian sanctuary was all about creating layers of comfort, incorporating natural elements, and adding personal touches that make the space feel truly unique.

## The Bohemian Approach

Bohemian style is about:
- Mixing patterns and textures
- Incorporating global influences
- Creating cozy, lived-in spaces
- Celebrating individuality
- Connecting with nature

## The Transformation

### Creating Layers
We added multiple textile layers:
- Macrame wall hangings
- Layered rugs
- Mixed throw pillows
- Flowing curtains

### Adding Warmth
- Warm, earthy paint colors
- String lights for ambient lighting
- Candles and lanterns
- Natural wood furniture

### Bringing in Nature
- Multiple plants in varied containers
- Natural fiber baskets
- Dried flowers and pampas grass
- Crystals and stones

## The Results

Our bedroom is now a true retreat - a space that feels calm, creative, and completely personal to us. The bohemian elements add so much character and warmth.

*What's your favorite way to add bohemian touches to your space?*
`
    }
  ];

  sampleProjects.forEach(project => {
    const filePath = path.join(PROJECTS_DIRECTORY, project.filename);
    fs.writeFileSync(filePath, project.content);
  });
}

/**
 * Calculate estimated read time based on word count
 */
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate excerpt from content if not provided in frontmatter
 */
function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove markdown formatting
  const plainText = content
    .replace(/^#+\s/gm, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/`(.*?)`/g, '$1') // Remove code
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.slice(0, maxLength).trim() + '...';
}

/**
 * Parse markdown file and extract project data
 */
function parseMarkdownFile(filePath: string): Project | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const slug = path.basename(filePath, '.md');
    const id = slug;
    
    // Ensure required fields exist
    if (!data.title || !data.publishedAt) {
      console.warn(`Project file ${filePath} is missing required fields`);
      return null;
    }
    
    const project: Project = {
      id,
      slug,
      title: data.title,
      excerpt: data.excerpt || generateExcerpt(content),
      content,
      featuredImage: data.featuredImage || '/images/projects/placeholder.jpg',
      beforeImage: data.beforeImage,
      afterImage: data.afterImage,
      publishedAt: new Date(data.publishedAt),
      category: data.category || 'DIY Projects',
      tags: data.tags || [],
      author: data.author || 'Ashley Rose',
      readTime: data.readTime || calculateReadTime(content),
      timeline: data.timeline,
      budget: data.budget,
      difficulty: data.difficulty,
      materials: data.materials,
      roomType: data.roomType,
      projectType: data.projectType,
      isBeforeAfter: data.isBeforeAfter || false
    };
    
    return project;
  } catch (error) {
    console.error(`Error parsing project file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all projects with optional filtering and pagination
 */
export async function getAllProjects(options: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
  ensureProjectsDirectory();
  
  const { category, search, page = 1, limit = 10 } = options;
  
  try {
    const fileNames = fs.readdirSync(PROJECTS_DIRECTORY);
    const markdownFiles = fileNames.filter(name => name.endsWith('.md'));
    
    const projects = markdownFiles
      .map(fileName => {
        const filePath = path.join(PROJECTS_DIRECTORY, fileName);
        return parseMarkdownFile(filePath);
      })
      .filter((project): project is Project => project !== null)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    
    // Filter by category
    let filteredProjects = projects;
    if (category && category !== 'All Projects') {
      filteredProjects = projects.filter(project => 
        project.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProjects = filteredProjects.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.excerpt.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        project.roomType?.toLowerCase().includes(searchLower)
      );
    }
    
    // Calculate pagination
    const totalProjects = filteredProjects.length;
    const totalPages = Math.ceil(totalProjects / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    
    return {
      projects: paginatedProjects,
      pagination: {
        currentPage: page,
        totalPages,
        totalProjects,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error loading projects:', error);
    return {
      projects: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalProjects: 0,
        hasNextPage: false,
        hasPreviousPage: false
      }
    };
  }
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  ensureProjectsDirectory();
  
  try {
    const filePath = path.join(PROJECTS_DIRECTORY, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    return parseMarkdownFile(filePath);
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}

/**
 * Get related projects based on category and tags
 */
export async function getRelatedProjects(currentProject: Project, limit: number = 3): Promise<Project[]> {
  const { projects } = await getAllProjects();
  
  const related = projects
    .filter(project => project.id !== currentProject.id)
    .map(project => {
      let score = 0;
      
      // Same category gets higher score
      if (project.category === currentProject.category) {
        score += 3;
      }
      
      // Shared tags get score
      const sharedTags = project.tags.filter(tag => 
        currentProject.tags.includes(tag)
      );
      score += sharedTags.length;
      
      // Same room type gets score
      if (project.roomType === currentProject.roomType) {
        score += 2;
      }
      
      return { project, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.project);
  
  return related;
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: string) {
  return getAllProjects({ category });
}

/**
 * Get featured projects (can be customized based on your criteria)
 */
export async function getFeaturedProjects(limit: number = 6): Promise<Project[]> {
  const { projects } = await getAllProjects({ limit });
  return projects;
} 