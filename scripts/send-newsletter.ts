#!/usr/bin/env npx ts-node

/**
 * Newsletter Send Script
 * 
 * This script sends newsletters to all active subscribers using Gmail SMTP.
 * Run it from the command line to send the latest draft newsletter
 * or a specific newsletter by ID.
 * 
 * SETUP INSTRUCTIONS:
 * ===================
 * 1. Install nodemailer: npm install nodemailer
 * 2. Create a Gmail App Password (see instructions below)
 * 3. Create a .env.local file with your credentials (see below)
 * 
 * GMAIL APP PASSWORD SETUP:
 * ========================
 * 1. Go to https://myaccount.google.com/security
 * 2. Enable 2-Step Verification if not already enabled
 * 3. Go to https://myaccount.google.com/apppasswords
 * 4. Select "Mail" and "Other (Custom name)"
 * 5. Name it "Newsletter Script" and click Generate
 * 6. Copy the 16-character password (no spaces)
 * 
 * ENVIRONMENT VARIABLES (.env.local):
 * ===================================
 * GMAIL_USER=your.email@gmail.com
 * GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
 * GMAIL_FROM_NAME=Ashley Rose
 * 
 * Usage:
 *   npx ts-node scripts/send-newsletter.ts                       # Send latest draft
 *   npx ts-node scripts/send-newsletter.ts --id <newsletter-id>  # Send specific newsletter
 *   npx ts-node scripts/send-newsletter.ts --preview             # Preview only, don't send
 *   npx ts-node scripts/send-newsletter.ts --list                # List all newsletters
 *   npx ts-node scripts/send-newsletter.ts --test                # Send test email to yourself
 */

import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { 
  getAllNewsletters, 
  getNewsletterById, 
  getLatestDraftNewsletter,
  updateNewsletterStatus,
  Newsletter 
} from '../src/lib/newsletter-content';
import { 
  generateNewsletterHTML, 
  generateNewsletterPlainText,
  formatBlogPostsForNewsletter,
  NewsletterBlogPost
} from '../src/lib/newsletter-template';
import { getActiveSubscribers, generateUnsubscribeUrl } from '../src/lib/newsletter';
import { getBlogPostBySlug } from '../src/lib/blog';
import { siteConfig } from '../src/lib/config';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// ============================================
// GMAIL SMTP CONFIGURATION
// ============================================

const GMAIL_USER = process.env.GMAIL_USER || '';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';
const GMAIL_FROM_NAME = process.env.GMAIL_FROM_NAME || 'Ashley Rose';
const BASE_URL = siteConfig.url;

// Create the email transporter using Gmail SMTP
let transporter: nodemailer.Transporter | null = null;

/**
 * Initialize the Gmail SMTP transporter
 * Returns true if successful, false if credentials are missing
 */
function initializeTransporter(): boolean {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return false;
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD.replace(/\s/g, ''), // Remove any spaces from app password
    },
  });

  return true;
}

/**
 * Check if email sending is configured
 */
function isEmailConfigured(): boolean {
  return !!(GMAIL_USER && GMAIL_APP_PASSWORD);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Parse command line arguments
 */
function parseArgs(): { 
  id?: string; 
  preview: boolean; 
  list: boolean;
  help: boolean;
  test: boolean;
} {
  const args = process.argv.slice(2);
  const result = { 
    id: undefined as string | undefined, 
    preview: false, 
    list: false,
    help: false,
    test: false
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--id' && args[i + 1]) {
      result.id = args[i + 1];
      i++;
    } else if (args[i] === '--preview') {
      result.preview = true;
    } else if (args[i] === '--list') {
      result.list = true;
    } else if (args[i] === '--help' || args[i] === '-h') {
      result.help = true;
    } else if (args[i] === '--test') {
      result.test = true;
    }
  }

  return result;
}

/**
 * Print help message
 */
function printHelp(): void {
  console.log(`
Newsletter Send Script (Gmail SMTP)
====================================

Usage:
  npx ts-node scripts/send-newsletter.ts [options]

Options:
  --id <id>     Send a specific newsletter by ID (filename without .md)
  --preview     Preview the newsletter without sending
  --list        List all newsletters and their status
  --test        Send a test email to yourself (uses GMAIL_USER)
  --help, -h    Show this help message

Examples:
  npx ts-node scripts/send-newsletter.ts                           # Send latest draft
  npx ts-node scripts/send-newsletter.ts --id 2025-12-30-weekly    # Send specific newsletter
  npx ts-node scripts/send-newsletter.ts --preview                 # Preview latest draft
  npx ts-node scripts/send-newsletter.ts --list                    # List all newsletters
  npx ts-node scripts/send-newsletter.ts --test                    # Send test to yourself

Setup:
  1. Create .env.local file with:
     GMAIL_USER=your.email@gmail.com
     GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
     GMAIL_FROM_NAME=Ashley Rose

  2. Get Gmail App Password:
     - Go to https://myaccount.google.com/apppasswords
     - Create a new app password for "Mail"

Newsletter files should be placed in: content/newsletters/
Format: YYYY-MM-DD-title.md
`);
}

/**
 * Print configuration status
 */
function printConfigStatus(): void {
  console.log('\n⚙️  Configuration Status:\n');
  
  if (GMAIL_USER) {
    console.log(`   ✅ GMAIL_USER: ${GMAIL_USER}`);
  } else {
    console.log('   ❌ GMAIL_USER: Not set');
  }
  
  if (GMAIL_APP_PASSWORD) {
    console.log('   ✅ GMAIL_APP_PASSWORD: Set (hidden)');
  } else {
    console.log('   ❌ GMAIL_APP_PASSWORD: Not set');
  }
  
  console.log(`   📧 From Name: ${GMAIL_FROM_NAME}`);
  console.log(`   🌐 Base URL: ${BASE_URL}`);
  console.log('');
}

/**
 * List all newsletters
 */
async function listNewsletters(): Promise<void> {
  console.log('\n📋 All Newsletters:\n');
  
  const newsletters = await getAllNewsletters();
  
  if (newsletters.length === 0) {
    console.log('  No newsletters found in content/newsletters/');
    console.log('  Create a markdown file to get started.\n');
    return;
  }

  for (const newsletter of newsletters) {
    const statusEmoji = newsletter.status === 'sent' ? '✅' : 
                        newsletter.status === 'scheduled' ? '📅' : '📝';
    console.log(`  ${statusEmoji} ${newsletter.id}`);
    console.log(`     Subject: ${newsletter.subject}`);
    console.log(`     Status: ${newsletter.status}`);
    console.log(`     Blog posts: ${newsletter.featuredBlogSlugs.length}`);
    if (newsletter.sentAt) {
      console.log(`     Sent: ${newsletter.sentAt.toLocaleDateString()}`);
    }
    console.log('');
  }
}

/**
 * Resolve blog posts from slugs
 */
async function resolveBlogPosts(slugs: string[]): Promise<NewsletterBlogPost[]> {
  const posts = [];
  
  for (const slug of slugs) {
    const post = await getBlogPostBySlug(slug);
    if (post) {
      posts.push(post);
    } else {
      console.warn(`  ⚠️  Blog post not found: ${slug}`);
    }
  }
  
  return formatBlogPostsForNewsletter(posts, BASE_URL);
}

/**
 * Send email to a single recipient
 * Returns true if successful, false otherwise
 */
async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text: string
): Promise<boolean> {
  // If email is not configured, log instead
  if (!transporter) {
    console.log(`  📧 [DEV MODE] Would send to: ${to}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: `"${GMAIL_FROM_NAME}" <${GMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    
    console.log(`  ✅ Sent to: ${to}`);
    return true;

  } catch (error) {
    console.error(`  ❌ Failed to send to ${to}:`, error);
    return false;
  }
}

/**
 * Send a test email to yourself
 */
async function sendTestEmail(): Promise<void> {
  console.log('\n🧪 Sending Test Email\n');

  if (!isEmailConfigured()) {
    console.log('❌ Gmail is not configured!');
    printConfigStatus();
    console.log('Please set up your .env.local file with Gmail credentials.\n');
    return;
  }

  if (!initializeTransporter()) {
    console.log('❌ Failed to initialize email transporter.\n');
    return;
  }

  // Get latest newsletter for test content
  const newsletter = await getLatestDraftNewsletter();
  
  if (!newsletter) {
    console.log('❌ No draft newsletter found to use for test.');
    console.log('   Create a newsletter in content/newsletters/ first.\n');
    return;
  }

  console.log(`📰 Using newsletter: ${newsletter.subject}`);
  console.log(`📧 Sending to: ${GMAIL_USER}\n`);

  // Resolve blog posts
  const blogPosts = await resolveBlogPosts(newsletter.featuredBlogSlugs);

  // Generate test email
  const testUnsubscribeUrl = `${BASE_URL}/newsletter/unsubscribe?token=test-token`;
  const html = generateNewsletterHTML(newsletter, blogPosts, testUnsubscribeUrl, BASE_URL);
  const text = generateNewsletterPlainText(newsletter, blogPosts, testUnsubscribeUrl, BASE_URL);

  // Send test email
  const success = await sendEmail(
    GMAIL_USER,
    `[TEST] ${newsletter.subject}`,
    html,
    text
  );

  if (success) {
    console.log('\n🎉 Test email sent successfully!');
    console.log(`   Check your inbox at: ${GMAIL_USER}\n`);
  } else {
    console.log('\n❌ Failed to send test email. Check the error above.\n');
  }
}

/**
 * Preview a newsletter
 */
async function previewNewsletter(newsletter: Newsletter): Promise<void> {
  console.log('\n📬 Newsletter Preview\n');
  console.log('━'.repeat(50));
  console.log(`Subject: ${newsletter.subject}`);
  console.log(`Preview: ${newsletter.previewText}`);
  console.log('━'.repeat(50));
  console.log(`\n${newsletter.salutation}\n`);
  console.log(newsletter.message);
  console.log(`\n${newsletter.signOff}`);
  console.log(newsletter.signature);
  console.log('\n━'.repeat(50));
  
  if (newsletter.featuredBlogSlugs.length > 0) {
    console.log('\nFeatured Blog Posts:');
    const blogPosts = await resolveBlogPosts(newsletter.featuredBlogSlugs);
    for (const post of blogPosts) {
      console.log(`  • ${post.title}`);
    }
  }
  
  console.log('\n━'.repeat(50));
  console.log(`Status: ${newsletter.status}`);
  console.log(`ID: ${newsletter.id}`);
  console.log('━'.repeat(50) + '\n');
}

/**
 * Send a newsletter to all subscribers
 */
async function sendNewsletter(newsletter: Newsletter, previewOnly: boolean): Promise<void> {
  console.log('\n🚀 Newsletter Send Script\n');
  console.log(`📰 Newsletter: ${newsletter.subject}`);
  console.log(`📝 ID: ${newsletter.id}`);
  console.log(`📊 Status: ${newsletter.status}`);
  
  // Check if already sent
  if (newsletter.status === 'sent') {
    console.log('\n⚠️  This newsletter has already been sent!');
    console.log('   Use --preview to view it, or create a new newsletter.\n');
    return;
  }

  // Resolve blog posts
  console.log('\n📚 Resolving blog posts...');
  const blogPosts = await resolveBlogPosts(newsletter.featuredBlogSlugs);
  console.log(`   Found ${blogPosts.length} blog posts`);

  // Get subscribers
  console.log('\n👥 Loading subscribers...');
  const subscribers = await getActiveSubscribers();
  console.log(`   Found ${subscribers.length} active subscribers`);

  if (subscribers.length === 0) {
    console.log('\n⚠️  No subscribers to send to!\n');
    return;
  }

  // Preview mode
  if (previewOnly) {
    await previewNewsletter(newsletter);
    console.log(`\n📋 Would send to ${subscribers.length} subscribers`);
    console.log('   Run without --preview to actually send.\n');
    return;
  }

  // Check email configuration
  if (!isEmailConfigured()) {
    console.log('\n⚠️  Gmail is not configured - running in DEVELOPMENT MODE');
    console.log('   Emails will be logged but not actually sent.');
    printConfigStatus();
  } else {
    if (!initializeTransporter()) {
      console.log('\n❌ Failed to initialize email transporter.\n');
      return;
    }
    console.log('\n✅ Gmail SMTP configured and ready');
  }

  // Confirm send
  console.log(`\n⚡ Ready to send to ${subscribers.length} subscribers`);
  console.log('   Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
  
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Send to each subscriber
  console.log('📤 Sending emails...\n');
  
  let sent = 0;
  let failed = 0;

  for (const subscriber of subscribers) {
    // Generate personalized unsubscribe URL
    const unsubscribeUrl = generateUnsubscribeUrl(BASE_URL, subscriber.unsubscribeToken);
    
    // Generate email content
    const html = generateNewsletterHTML(newsletter, blogPosts, unsubscribeUrl, BASE_URL);
    const text = generateNewsletterPlainText(newsletter, blogPosts, unsubscribeUrl, BASE_URL);
    
    // Send email
    const success = await sendEmail(subscriber.email, newsletter.subject, html, text);
    
    if (success) {
      sent++;
    } else {
      failed++;
    }

    // Add a small delay between emails to avoid rate limiting
    if (transporter) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Update newsletter status
  if (sent > 0) {
    await updateNewsletterStatus(newsletter.id, 'sent', new Date());
    console.log('\n✅ Newsletter marked as sent');
  }

  // Print summary
  console.log('\n━'.repeat(50));
  console.log('📊 Summary:');
  console.log(`   ✅ Sent: ${sent}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📧 Total: ${subscribers.length}`);
  console.log('━'.repeat(50) + '\n');

  if (sent > 0 && failed === 0) {
    console.log('🎉 Newsletter sent successfully!\n');
  } else if (failed > 0) {
    console.log('⚠️  Some emails failed to send. Check the logs above.\n');
  }
}

// ============================================
// MAIN EXECUTION
// ============================================

async function main(): Promise<void> {
  const args = parseArgs();

  // Show help
  if (args.help) {
    printHelp();
    return;
  }

  // List newsletters
  if (args.list) {
    await listNewsletters();
    return;
  }

  // Send test email
  if (args.test) {
    await sendTestEmail();
    return;
  }

  // Get newsletter to send
  let newsletter: Newsletter | null = null;

  if (args.id) {
    // Get specific newsletter
    newsletter = await getNewsletterById(args.id);
    if (!newsletter) {
      console.error(`\n❌ Newsletter not found: ${args.id}`);
      console.log('   Use --list to see available newsletters.\n');
      process.exit(1);
    }
  } else {
    // Get latest draft
    newsletter = await getLatestDraftNewsletter();
    if (!newsletter) {
      console.log('\n📭 No draft newsletters found.');
      console.log('   Create a markdown file in content/newsletters/ to get started.');
      console.log('   Use --list to see all newsletters.\n');
      process.exit(0);
    }
  }

  // Send or preview
  await sendNewsletter(newsletter, args.preview);
}

// Run the script
main().catch(error => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
