import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, Star, Calendar, Tag, MapPin, Wrench, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { getProjectBySlug, getRelatedProjects } from '@/lib/projects';
import { Project } from '@/types';

/**
 * Individual Project Page - Detailed project showcase
 * Features inspired by Chris Loves Julia project pages:
 * - Hero image with project title
 * - Before/after comparison images
 * - Detailed project information sidebar
 * - Full project content/story
 * - Materials list and budget breakdown
 * - Related projects section
 * - Social sharing
 */

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | At Home with Rose Projects`,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: [project.featuredImage],
      type: 'article',
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Back */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 md:h-[32rem] lg:h-[40rem] overflow-hidden">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                {project.category}
              </span>
              {project.isBeforeAfter && (
                <span className="px-3 py-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                  Before & After
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 font-medium">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl leading-relaxed font-medium">
              {project.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Before/After Images */}
            {project.isBeforeAfter && project.beforeImage && project.afterImage && (
              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-8 font-medium">
                  The Transformation
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Before</h3>
                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                      <Image
                        src={project.beforeImage}
                        alt={`${project.title} - Before`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">After</h3>
                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                      <Image
                        src={project.afterImage}
                        alt={`${project.title} - After`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Project Story */}
            <section className="prose prose-lg max-w-none mb-12">
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br />') }}
              />
            </section>

            {/* Materials List */}
            {project.materials && project.materials.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-serif text-gray-900 mb-6 font-medium flex items-center gap-2">
                  <Wrench className="w-6 h-6" />
                  Materials Used
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.materials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="text-gray-700 font-medium capitalize">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Project Details Card */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Project Details</h3>
                
                <div className="space-y-4">
                  {/* Timeline */}
                  {project.timeline && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Timeline</p>
                        <p className="font-medium text-gray-900">{project.timeline}</p>
                      </div>
                    </div>
                  )}

                  {/* Budget */}
                  {project.budget && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="font-medium text-gray-900">
                          {project.budget.min === project.budget.max 
                            ? `$${project.budget.min?.toLocaleString()}`
                            : `$${project.budget.min?.toLocaleString() || '0'} - $${project.budget.max?.toLocaleString() || '0'}`
                          }
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Difficulty */}
                  {project.difficulty && (
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Difficulty</p>
                        <p className="font-medium text-gray-900">{project.difficulty}</p>
                      </div>
                    </div>
                  )}

                  {/* Room Type */}
                  {project.roomType && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Room Type</p>
                        <p className="font-medium text-gray-900">{project.roomType}</p>
                      </div>
                    </div>
                  )}

                  {/* Published Date */}
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Published</p>
                      <p className="font-medium text-gray-900">
                        {project.publishedAt.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Read Time */}
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Read Time</p>
                      <p className="font-medium text-gray-900">{project.readTime} minutes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Share This Project</h3>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                    Share
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4 font-medium">
                You Might Also Like
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore more inspiring project transformations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <RelatedProjectCard key={relatedProject.id} project={relatedProject} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/**
 * Related Project Card Component
 */
interface RelatedProjectCardProps {
  project: Project;
}

function RelatedProjectCard({ project }: RelatedProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.featuredImage}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {project.isBeforeAfter && (
            <div className="absolute top-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full">
              <span className="text-xs font-medium text-gray-900">Before & After</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-lg font-serif text-gray-900 mb-2 group-hover:text-gray-700 transition-colors font-medium">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {project.excerpt.length > 100 
              ? `${project.excerpt.substring(0, 100)}...`
              : project.excerpt
            }
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{project.category}</span>
            <span>{project.readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
} 