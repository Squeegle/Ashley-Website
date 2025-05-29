import { SiteConfig, NavItem } from "@/types"

/**
 * Site configuration for Ashley Rose's website
 * Central place to manage site metadata, navigation, and social links
 */
export const siteConfig: SiteConfig = {
  name: "Ashley Rose",
  description: "DIY, Decor & Lifestyle Content Creator. Inspiring beautiful spaces and creative living through home projects, design tips, and lifestyle content.",
  url: "https://ashleyrose.com", // Update with actual domain
  ogImage: "https://ashleyrose.com/og.jpg", // Update with actual image
  links: {
    instagram: "https://instagram.com/ashleyrose", // Update with actual handle
    youtube: "https://youtube.com/@ashleyrose", // Update with actual channel
    spotify: "https://open.spotify.com/show/ashleyrose", // Update with actual podcast
    pinterest: "https://pinterest.com/ashleyrose", // Update with actual profile
    email: "hello@ashleyrose.com" // Update with actual email
  }
}

/**
 * Main navigation items for the website
 */
export const mainNav: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn more about Ashley Rose and her creative journey"
  },
  {
    title: "Blog",
    href: "/blog",
    description: "DIY tutorials, decor tips, and lifestyle content"
  },
  {
    title: "Gallery",
    href: "/gallery",
    description: "Visual inspiration and project showcases"
  },
  {
    title: "Collaboration Opportunities",
    href: "/contact",
    description: "Get in touch for collaborations and inquiries"
  }
]

/**
 * SEO keywords for the website
 */
export const seoKeywords = [
  "DIY projects",
  "home decor",
  "lifestyle blogger",
  "interior design",
  "home improvement",
  "crafts",
  "decorating tips",
  "home styling",
  "budget decor",
  "room makeover"
] 