/**
 * Newsletter Content Management Library
 * 
 * This module handles loading, parsing, and managing newsletter content
 * from markdown files, similar to how blog posts are managed.
 * 
 * Newsletter markdown files are stored in /content/newsletters/
 * Each file uses frontmatter for metadata and markdown for the message content.
 * 
 * Features:
 * - Markdown file parsing with frontmatter
 * - Automatic blog post linking
 * - Status tracking (draft, scheduled, sent)
 * - Send date scheduling
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Interface defining the structure of a newsletter
 */
export interface Newsletter {
  id: string;                    // Unique identifier (from filename)
  subject: string;               // Email subject line
  previewText: string;           // Preview text shown in email clients
  salutation: string;            // Opening greeting (e.g., "Hi friends!")
  message: string;               // The main message content (markdown)
  signOff: string;               // Sign-off text (e.g., "Talk soon,")
  signature: string;             // Signature name (e.g., "Ashley")
  featuredBlogSlugs: string[];   // Array of blog post slugs to feature
  status: 'draft' | 'scheduled' | 'sent';  // Newsletter status
  scheduledAt?: Date;            // When the newsletter is scheduled to send
  sentAt?: Date;                 // When the newsletter was actually sent
  createdAt: Date;               // When the file was created
}

// Path to newsletters directory
const NEWSLETTERS_DIRECTORY = path.join(process.cwd(), 'content/newsletters');

/**
 * Ensures the newsletters directory exists
 * Creates it if it doesn't exist
 */
function ensureNewslettersDirectory(): void {
  if (!fs.existsSync(NEWSLETTERS_DIRECTORY)) {
    fs.mkdirSync(NEWSLETTERS_DIRECTORY, { recursive: true });
  }
}

/**
 * Parse a single newsletter markdown file
 * 
 * @param filePath - Path to the markdown file
 * @returns Newsletter object or null if parsing fails
 */
function parseNewsletterFile(filePath: string): Newsletter | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);

    // Extract ID from filename (remove date prefix and .md extension)
    const filename = path.basename(filePath, '.md');
    const id = filename;

    // Parse dates
    const stats = fs.statSync(filePath);
    const createdAt = stats.birthtime;
    const scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : undefined;
    const sentAt = data.sentAt ? new Date(data.sentAt) : undefined;

    // Parse featured blog slugs (can be array or comma-separated string)
    let featuredBlogSlugs: string[] = [];
    if (Array.isArray(data.featuredBlogSlugs)) {
      featuredBlogSlugs = data.featuredBlogSlugs;
    } else if (typeof data.featuredBlogSlugs === 'string') {
      featuredBlogSlugs = data.featuredBlogSlugs.split(',').map((s: string) => s.trim());
    }

    return {
      id,
      subject: data.subject || 'Newsletter from At home with Rose',
      previewText: data.previewText || '',
      salutation: data.salutation || 'Hi friends!',
      message: content.trim(),
      signOff: data.signOff || 'Talk soon,',
      signature: data.signature || 'Ashley',
      featuredBlogSlugs,
      status: data.status || 'draft',
      scheduledAt,
      sentAt,
      createdAt,
    };
  } catch (error) {
    console.error(`Error parsing newsletter file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all newsletters with optional filtering
 * 
 * @param options - Filter options
 * @returns Array of newsletters sorted by creation date (newest first)
 */
export async function getAllNewsletters(options: {
  status?: 'draft' | 'scheduled' | 'sent';
} = {}): Promise<Newsletter[]> {
  ensureNewslettersDirectory();

  const { status } = options;

  try {
    // Read all markdown files from the newsletters directory
    const filenames = fs.readdirSync(NEWSLETTERS_DIRECTORY)
      .filter(name => name.endsWith('.md'));

    // Parse all newsletters
    let newsletters: Newsletter[] = filenames
      .map(filename => parseNewsletterFile(path.join(NEWSLETTERS_DIRECTORY, filename)))
      .filter((newsletter): newsletter is Newsletter => newsletter !== null);

    // Sort by creation date (newest first)
    newsletters.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Apply status filter
    if (status) {
      newsletters = newsletters.filter(n => n.status === status);
    }

    return newsletters;
  } catch (error) {
    console.error('Error reading newsletters:', error);
    return [];
  }
}

/**
 * Get a single newsletter by ID (filename without .md)
 * 
 * @param id - The newsletter ID (filename without .md)
 * @returns Newsletter object or null if not found
 */
export async function getNewsletterById(id: string): Promise<Newsletter | null> {
  ensureNewslettersDirectory();

  try {
    const filenames = fs.readdirSync(NEWSLETTERS_DIRECTORY)
      .filter(name => name.endsWith('.md'));

    for (const filename of filenames) {
      const newsletter = parseNewsletterFile(path.join(NEWSLETTERS_DIRECTORY, filename));
      if (newsletter && newsletter.id === id) {
        return newsletter;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error getting newsletter ${id}:`, error);
    return null;
  }
}

/**
 * Update newsletter status in the markdown file (e.g., mark as sent)
 * 
 * @param id - The newsletter ID
 * @param status - The new status
 * @param sentAt - Optional sent timestamp
 * @returns Success boolean
 */
export async function updateNewsletterStatus(
  id: string,
  status: 'draft' | 'scheduled' | 'sent',
  sentAt?: Date
): Promise<boolean> {
  ensureNewslettersDirectory();

  try {
    const filenames = fs.readdirSync(NEWSLETTERS_DIRECTORY)
      .filter(name => name.endsWith('.md'));

    for (const filename of filenames) {
      const filePath = path.join(NEWSLETTERS_DIRECTORY, filename);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);

      // Check if this is the right file
      const fileId = path.basename(filePath, '.md');
      if (fileId === id) {
        // Update the frontmatter
        data.status = status;
        if (sentAt) {
          data.sentAt = sentAt.toISOString();
        }

        // Rebuild the file content
        const updatedContent = matter.stringify(content, data);
        fs.writeFileSync(filePath, updatedContent, 'utf-8');

        return true;
      }
    }

    return false;
  } catch (error) {
    console.error(`Error updating newsletter ${id}:`, error);
    return false;
  }
}

/**
 * Get the latest draft newsletter (for sending)
 * 
 * @returns The most recent draft newsletter or null
 */
export async function getLatestDraftNewsletter(): Promise<Newsletter | null> {
  const newsletters = await getAllNewsletters({ status: 'draft' });
  return newsletters.length > 0 ? newsletters[0] : null;
}

