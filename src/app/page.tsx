import { HomeHero } from "@/components/layout";
import { Section, ContentGrid } from "@/components/layout";
import Link from "next/link";
import { ArrowRight, Instagram, Palette, Home as HomeIcon, Heart } from "lucide-react";

/**
 * Homepage - Ashley Rose Interior Design & Lifestyle
 * Features the main hero section, services overview, recent work,
 * and about section in the style of chrislovesjulia.com
 */
export default function Home() {
  return (
    <div>
      {/* Hero Section - Large image with overlaid text */}
      <HomeHero />

      {/* Services Section */}
      <Section spacing="large" background="gray">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            How We Can Help
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From full-scale renovations to simple styling consultations, 
            we create spaces that reflect your unique story and lifestyle.
          </p>
        </div>

        <ContentGrid maxColumns={3}>
          <ServiceCard
            icon={<HomeIcon className="w-12 h-12" />}
            title="Full Home Design"
            description="Complete interior design services from concept to completion, creating cohesive spaces throughout your home."
            link="/services/interior-design"
          />
          <ServiceCard
            icon={<Palette className="w-12 h-12" />}
            title="Design Consultations"
            description="Expert guidance and personalized recommendations to help you make confident design decisions."
            link="/services/consultations"
          />
          <ServiceCard
            icon={<Heart className="w-12 h-12" />}
            title="Virtual Styling"
            description="Professional design services delivered remotely, perfect for any budget or timeline."
            link="/services/virtual-design"
          />
        </ContentGrid>
      </Section>

      {/* Featured Work Section */}
      <Section spacing="large">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Recent Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take a peek inside some of our favorite recent transformations, 
            where functionality meets beauty in every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ProjectCard
            image="/images/project-1.jpg"
            title="Modern Coastal Living Room"
            description="A serene space combining natural textures with contemporary comfort."
            link="/gallery/modern-coastal-living"
          />
          <ProjectCard
            image="/images/project-2.jpg"
            title="Scandinavian Kitchen Remodel"
            description="Clean lines and warm woods create the perfect family gathering space."
            link="/gallery/scandinavian-kitchen"
          />
          <ProjectCard
            image="/images/project-3.jpg"
            title="Bohemian Master Bedroom"
            description="A dreamy retreat featuring rich textures and curated vintage finds."
            link="/gallery/bohemian-bedroom"
          />
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      {/* About Section */}
      <Section spacing="large" background="gray">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
              Hi, I&apos;m Ashley Rose
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                I believe that your home should tell your story—every room should reflect 
                who you are and how you live. With over 8 years of experience in interior 
                design, I specialize in creating spaces that are both beautiful and deeply personal.
              </p>
              <p>
                My approach combines timeless design principles with fresh, contemporary touches, 
                ensuring your space feels collected rather than decorated. I love mixing high and 
                low pieces, vintage finds with modern furniture, and always prioritize function 
                alongside beauty.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Learn More About Me
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-md hover:border-gray-400 transition-colors duration-200 font-medium"
              >
                <Instagram className="w-4 h-4" />
                Follow My Journey
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative h-96 md:h-[32rem] rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">👩‍🎨</div>
                <p className="text-sm font-medium">Ashley Rose Portrait</p>
                <p className="text-xs">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Instagram Section */}
      <Section spacing="medium">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Follow Along
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get daily design inspiration and behind-the-scenes glimpses on Instagram
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium"
          >
            <Instagram className="w-5 h-5" />
            @ashleyrose.design
          </Link>
        </div>

        {/* Instagram Grid Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/**
 * Service Card Component
 */
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

function ServiceCard({ icon, title, description, link }: ServiceCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="text-gray-700 mb-4">{icon}</div>
      <h3 className="text-xl font-serif text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
      <Link
        href={link}
        className="inline-flex items-center gap-2 text-gray-900 font-medium hover:gap-3 transition-all duration-200"
      >
        Learn More
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

/**
 * Project Card Component
 */
interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProjectCard({ image, title, description, link }: ProjectCardProps) {
  return (
    <Link href={link} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="relative h-64 overflow-hidden">
          <div className="w-full h-full bg-gray-200"></div>
          {/* Placeholder for actual image */}
          {/* <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          /> */}
        </div>
        <div className="p-6">
          <h3 className="text-lg font-serif text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  );
}
