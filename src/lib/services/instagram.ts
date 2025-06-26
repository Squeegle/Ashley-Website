import { InstagramPost } from '@/types';

/**
 * Instagram API service for fetching latest posts
 * Requires Instagram Basic Display API setup with following environment variables:
 * - INSTAGRAM_ACCESS_TOKEN
 */

const INSTAGRAM_API_URL = 'https://graph.instagram.com/me/media';

export async function getLatestInstagramPosts(limit: number = 9): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.warn('Instagram access token not found. Please set INSTAGRAM_ACCESS_TOKEN environment variable.');
    return [];
  }

  try {
    const response = await fetch(
      `${INSTAGRAM_API_URL}?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${limit}&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data.data.map((post: any) => ({
      id: post.id,
      caption: post.caption || '',
      mediaUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
      mediaType: post.media_type.toLowerCase()
    }));
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
} 