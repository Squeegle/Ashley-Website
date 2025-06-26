import { SiteConfig, NavItem } from "@/types"

/**
 * Site configuration for At home with Rose website
 * Central place to manage site metadata, navigation, and social links
 */
export const siteConfig: SiteConfig = {
  name: "At home with Rose",
  description: "DIY, Decor & Lifestyle Content Creator. Inspiring beautiful spaces and creative living through home projects, design tips, and lifestyle content.",
  url: "https://ashleyrose.com", // Update with actual domain
  ogImage: "https://ashleyrose.com/og.jpg", // Update with actual image
  links: {
    instagram: "https://www.instagram.com/ashleyrosep?igsh=eDhtaWRlcTY2MXpz", // Update with actual handle
    youtube: "https://youtube.com/@ashleyrose", // Update with actual channel
    spotify: "https://open.spotify.com/show/ashleyrose", // Update with actual podcast
    pinterest: "https://pinterest.com/ashleyrose", // Update with actual profile
    facebook: "https://www.facebook.com/share/1Cpr5LSvy6/", // Facebook profile
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
    title: "Shop",
    href: "https://www.shopltk.com/explore/Ashley_Rose/",
    description: "Shop my favorite home decor and lifestyle products"
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