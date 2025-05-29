import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';

/**
 * AuthorBio Component - Display author information and social links
 * Features:
 * - Author photo and bio
 * - Social media links
 * - Call-to-action for following
 */

interface AuthorBioProps {
  author: string;
  className?: string;
}

export default function AuthorBio({ author, className = '' }: AuthorBioProps) {
  // In a real app, you'd fetch this data based on the author
  const authorData = {
    name: author,
    bio: "Hi! I'm Ashley Rose, a DIY enthusiast and home decor lover sharing my passion for creating beautiful, functional spaces on any budget. When I'm not renovating rooms or crafting, you'll find me hunting for vintage treasures and dreaming up my next project.",
    image: "/images/author/ashley-rose.jpg",
    instagram: "@ashleyrose.design",
    email: "hello@ashleyrose.com",
  };

  return (
    <div className={`bg-white rounded-lg p-8 shadow-sm border border-gray-100 ${className}`}>
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Author Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
            {/* Placeholder for now - replace with actual author image */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-1">👩‍🎨</div>
                <p className="text-xs font-semibold text-gray-700">Ashley</p>
              </div>
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-2xl font-serif text-gray-900 mb-2">
              About {authorData.name}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {authorData.bio}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`https://instagram.com/${authorData.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold text-sm"
            >
              <Instagram className="w-4 h-4" />
              Follow on Instagram
            </Link>
            
            <Link
              href={`mailto:${authorData.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-md hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200 font-semibold text-sm"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 