// Content types for Ashley Rose's website

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  publishedAt: Date
  slug: string
  tags: string[]
  author: string
  readTime: number
}

export interface InstagramPost {
  id: string
  caption: string
  mediaUrl: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  permalink: string
  timestamp: string
  thumbnailUrl?: string
}

export interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string
  duration: string
  viewCount: number
  url: string
}

export interface SpotifyEpisode {
  id: string
  name: string
  description: string
  audioPreviewUrl?: string
  releaseDate: string
  durationMs: number
  images: Array<{
    url: string
    height: number
    width: number
  }>
  externalUrls: {
    spotify: string
  }
}

export interface NavItem {
  title: string
  href: string
  description?: string
}

export interface SocialLinks {
  instagram?: string
  youtube?: string
  spotify?: string
  pinterest?: string
  tiktok?: string
  email?: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: SocialLinks
}

export interface NewsletterSubscriber {
  email: string
  firstName?: string
  subscribedAt: Date
  isActive: boolean
} 