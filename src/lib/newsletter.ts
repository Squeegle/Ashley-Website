/**
 * Newsletter Utility Functions
 * 
 * This module handles all newsletter-related operations including:
 * - Adding subscribers to the mailing list
 * - Removing subscribers (unsubscribe)
 * - Generating secure unsubscribe tokens
 * - Reading/writing to the subscriber database (JSON file)
 * 
 * The subscriber data is stored in a JSON file at /data/newsletter-subscribers.json
 * Each subscriber has:
 * - email: The subscriber's email address
 * - unsubscribeToken: A unique token for secure unsubscribe links
 * - subscribedAt: ISO timestamp of when they subscribed
 * - isActive: Boolean indicating if they're still subscribed
 */

import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Interface defining the structure of a newsletter subscriber
 */
export interface Subscriber {
  email: string;              // The subscriber's email address
  unsubscribeToken: string;   // Unique token for unsubscribe links
  subscribedAt: string;       // ISO 8601 timestamp of subscription
  isActive: boolean;          // Whether the subscription is active
}

/**
 * Interface for the subscriber database structure
 */
interface SubscriberDatabase {
  subscribers: Subscriber[];
  lastUpdated: string;        // ISO 8601 timestamp of last modification
}

/**
 * Path to the subscriber database JSON file
 * Located in the /data directory at the project root
 */
const DATA_DIR = path.join(process.cwd(), 'data');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'newsletter-subscribers.json');

/**
 * Ensures the data directory exists
 * Creates it if it doesn't exist
 */
async function ensureDataDirectory(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    // Directory doesn't exist, create it
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

/**
 * Reads the subscriber database from the JSON file
 * Creates an empty database if the file doesn't exist
 * 
 * @returns Promise<SubscriberDatabase> - The subscriber database object
 */
async function readSubscriberDatabase(): Promise<SubscriberDatabase> {
  try {
    // Ensure the data directory exists first
    await ensureDataDirectory();
    
    // Try to read the existing file
    const data = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(data) as SubscriberDatabase;
  } catch {
    // File doesn't exist or is invalid, return empty database
    return {
      subscribers: [],
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Writes the subscriber database to the JSON file
 * Updates the lastUpdated timestamp automatically
 * 
 * @param database - The subscriber database to write
 */
async function writeSubscriberDatabase(database: SubscriberDatabase): Promise<void> {
  // Ensure the data directory exists
  await ensureDataDirectory();
  
  // Update the lastUpdated timestamp
  database.lastUpdated = new Date().toISOString();
  
  // Write the database to file with pretty formatting for readability
  await fs.writeFile(
    SUBSCRIBERS_FILE,
    JSON.stringify(database, null, 2),
    'utf-8'
  );
}

/**
 * Generates a secure random token for unsubscribe links
 * Uses crypto.randomUUID() for cryptographically secure random generation
 * 
 * @returns string - A unique unsubscribe token
 */
function generateUnsubscribeToken(): string {
  return crypto.randomUUID();
}

/**
 * Validates an email address format
 * Uses a comprehensive regex pattern for email validation
 * 
 * @param email - The email address to validate
 * @returns boolean - True if the email format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Adds a new subscriber to the mailing list
 * 
 * Features:
 * - Validates email format
 * - Prevents duplicate subscriptions
 * - Reactivates previously unsubscribed emails
 * - Generates secure unsubscribe token
 * 
 * @param email - The email address to subscribe
 * @returns Promise<{success: boolean, message: string, subscriber?: Subscriber}>
 */
export async function addSubscriber(email: string): Promise<{
  success: boolean;
  message: string;
  subscriber?: Subscriber;
}> {
  // Normalize email to lowercase for consistency
  const normalizedEmail = email.toLowerCase().trim();
  
  // Validate email format
  if (!isValidEmail(normalizedEmail)) {
    return {
      success: false,
      message: 'Invalid email address format'
    };
  }
  
  // Read current database
  const database = await readSubscriberDatabase();
  
  // Check if email already exists
  const existingSubscriber = database.subscribers.find(
    sub => sub.email.toLowerCase() === normalizedEmail
  );
  
  if (existingSubscriber) {
    // If they're already active, let them know
    if (existingSubscriber.isActive) {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter'
      };
    }
    
    // Reactivate a previously unsubscribed email
    existingSubscriber.isActive = true;
    existingSubscriber.subscribedAt = new Date().toISOString();
    // Generate a new token for security
    existingSubscriber.unsubscribeToken = generateUnsubscribeToken();
    
    await writeSubscriberDatabase(database);
    
    return {
      success: true,
      message: 'Welcome back! Your subscription has been reactivated',
      subscriber: existingSubscriber
    };
  }
  
  // Create new subscriber
  const newSubscriber: Subscriber = {
    email: normalizedEmail,
    unsubscribeToken: generateUnsubscribeToken(),
    subscribedAt: new Date().toISOString(),
    isActive: true
  };
  
  // Add to database
  database.subscribers.push(newSubscriber);
  await writeSubscriberDatabase(database);
  
  return {
    success: true,
    message: 'Successfully subscribed to the newsletter',
    subscriber: newSubscriber
  };
}

/**
 * Removes a subscriber from the mailing list using their unsubscribe token
 * 
 * This doesn't delete the record, but sets isActive to false
 * This allows for potential resubscription and audit trails
 * 
 * @param token - The unsubscribe token from the unsubscribe link
 * @returns Promise<{success: boolean, message: string}>
 */
export async function removeSubscriber(token: string): Promise<{
  success: boolean;
  message: string;
}> {
  // Validate token format (should be a UUID)
  if (!token || token.length < 10) {
    return {
      success: false,
      message: 'Invalid unsubscribe token'
    };
  }
  
  // Read current database
  const database = await readSubscriberDatabase();
  
  // Find subscriber by token
  const subscriber = database.subscribers.find(
    sub => sub.unsubscribeToken === token
  );
  
  if (!subscriber) {
    return {
      success: false,
      message: 'Unsubscribe link is invalid or has expired'
    };
  }
  
  // Check if already unsubscribed
  if (!subscriber.isActive) {
    return {
      success: true,
      message: 'You have already been unsubscribed from our newsletter'
    };
  }
  
  // Deactivate the subscription
  subscriber.isActive = false;
  await writeSubscriberDatabase(database);
  
  return {
    success: true,
    message: 'You have been successfully unsubscribed from our newsletter'
  };
}

/**
 * Gets all active subscribers
 * Useful for sending newsletters
 * 
 * @returns Promise<Subscriber[]> - Array of active subscribers
 */
export async function getActiveSubscribers(): Promise<Subscriber[]> {
  const database = await readSubscriberDatabase();
  return database.subscribers.filter(sub => sub.isActive);
}

/**
 * Gets a subscriber by their email address
 * 
 * @param email - The email address to look up
 * @returns Promise<Subscriber | null> - The subscriber or null if not found
 */
export async function getSubscriberByEmail(email: string): Promise<Subscriber | null> {
  const normalizedEmail = email.toLowerCase().trim();
  const database = await readSubscriberDatabase();
  
  return database.subscribers.find(
    sub => sub.email.toLowerCase() === normalizedEmail
  ) || null;
}

/**
 * Gets a subscriber by their unsubscribe token
 * 
 * @param token - The unsubscribe token to look up
 * @returns Promise<Subscriber | null> - The subscriber or null if not found
 */
export async function getSubscriberByToken(token: string): Promise<Subscriber | null> {
  const database = await readSubscriberDatabase();
  
  return database.subscribers.find(
    sub => sub.unsubscribeToken === token
  ) || null;
}

/**
 * Generates an unsubscribe URL for a subscriber
 * This URL can be included in newsletter emails
 * 
 * @param baseUrl - The base URL of the website (e.g., https://example.com)
 * @param token - The subscriber's unsubscribe token
 * @returns string - The full unsubscribe URL
 */
export function generateUnsubscribeUrl(baseUrl: string, token: string): string {
  return `${baseUrl}/newsletter/unsubscribe?token=${token}`;
}

