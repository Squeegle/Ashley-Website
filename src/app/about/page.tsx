import { PageBanner, Container, Section } from '@/components/layout';
import { Award, Users, Heart, Palette, Home, Building, Coffee } from 'lucide-react';

/**
 * About Page Component
 * Features:
 * - Hero banner with page title
 * - Personal bio section
 * - Timeline of professional experience
 * - Skills and services showcase
 * - Design philosophy section
 */
export default function AboutPage() {
  // Timeline data - easily configurable
  const timelineItems = [
    {
      year: '2018',
      title: 'Founded Ashley Rose Design',
      description: 'Started my own interior design studio with a focus on creating personalized, functional spaces that reflect each client\'s unique style.',
      icon: Home
    },
    {
      year: '2016',
      title: 'Senior Designer at Modern Spaces',
      description: 'Led residential and commercial projects, specializing in contemporary and transitional design styles for high-end clientele.',
      icon: Building
    },
    {
      year: '2014',
      title: 'Interior Design Certification',
      description: 'Graduated with honors from the Interior Design Institute, earning certification in residential and commercial design.',
      icon: Award
    },
    {
      year: '2012',
      title: 'Design Assistant',
      description: 'Began my career working alongside established designers, learning the fundamentals of space planning and client relations.',
      icon: Users
    }
  ];

  // Skills and services data
  const skills = [
    {
      title: 'Residential Design',
      description: 'Complete home makeovers, room redesigns, and new construction interior planning.',
      icon: Home,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Commercial Spaces',
      description: 'Office design, retail spaces, and hospitality interiors that enhance brand identity.',
      icon: Building,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Color Consultation',
      description: 'Expert color palette selection to create mood and atmosphere in any space.',
      icon: Palette,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Space Planning',
      description: 'Optimizing layouts for functionality, flow, and maximum use of available space.',
      icon: Coffee,
      color: 'bg-amber-50 text-amber-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <PageBanner 
        title="About Ashley" 
        description="Creating beautiful, functional spaces that tell your story"
        imageSrc="/images/about-hero.jpg"
        imageAlt="Ashley Rose in a beautifully designed interior space"
      />

      {/* Bio Section */}
      <Section className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-6">
                Hello, I&apos;m Ashley Rose
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  With over a decade of experience in interior design, I believe that every space has the potential to be extraordinary. My passion lies in creating environments that are not only beautiful but also deeply personal and functional for the people who live and work in them.
                </p>
                <p>
                  My design philosophy centers around the idea that your home should be a reflection of who you are – your personality, your lifestyle, and your dreams. I work closely with each client to understand their unique needs, preferences, and vision, then bring that vision to life through thoughtful design choices.
                </p>
                <p>
                  From cozy residential spaces to dynamic commercial environments, I approach every project with the same level of dedication and attention to detail. My goal is to create spaces that inspire, comfort, and enhance daily life.
                </p>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Heart size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-sm">Ashley Rose Portrait</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section className="py-16 lg:py-24 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-6">
              My Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From my first design assistant role to founding my own studio, here&apos;s how my passion for interior design has evolved over the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gray-300 hidden lg:block"></div>

            <div className="space-y-12 lg:space-y-16">
              {timelineItems.map((item, index) => {
                const IconComponent = item.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={item.year} className="relative">
                    {/* Desktop Timeline Item */}
                    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                      {/* Left side content (odd items) */}
                      {!isEven && (
                        <div className="text-right pr-8">
                          <div className="inline-block bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md ml-auto">
                            <div className="flex items-center justify-end mb-4">
                              <div className="mr-3">
                                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.year}</p>
                              </div>
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <IconComponent size={20} className="text-gray-600" />
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      )}

                      {/* Center dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-gray-400 rounded-full z-10"></div>

                      {/* Right side content (even items) */}
                      {isEven && (
                        <div className="pl-8">
                          <div className="inline-block bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-md">
                            <div className="flex items-center mb-4">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                <IconComponent size={20} className="text-gray-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.year}</p>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      )}

                      {/* Empty space for opposite side */}
                      {isEven && <div></div>}
                      {!isEven && <div></div>}
                    </div>

                    {/* Mobile Timeline Item */}
                    <div className="lg:hidden">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            <IconComponent size={20} className="text-gray-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.year}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Skills & Services Section */}
      <Section className="py-16 lg:py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-6">
              Skills & Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              I offer a comprehensive range of design services to transform your space into something truly special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill) => {
              const IconComponent = skill.icon;
              
              return (
                <div key={skill.title} className="text-center group">
                  <div className={`w-16 h-16 ${skill.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{skill.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Design Philosophy Section */}
      <Section className="py-16 lg:py-24 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-8">
              My Design Philosophy
            </h2>
            <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-light italic">
              &ldquo;Great design is not just about making things beautiful – it&apos;s about creating spaces that enhance the way people live, work, and feel.&rdquo;
            </blockquote>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Functionality First</h4>
                <p className="text-gray-600">Every design decision prioritizes how you actually use your space.</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Personal Expression</h4>
                <p className="text-gray-600">Your personality and lifestyle should shine through in every detail.</p>
              </div>
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Timeless Beauty</h4>
                <p className="text-gray-600">Creating designs that will feel fresh and relevant for years to come.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
} 