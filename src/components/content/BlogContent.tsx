/**
 * BlogContent Component - Simple markdown content renderer
 * For now, displays content as-is. Can be enhanced later with proper markdown parsing.
 */

interface BlogContentProps {
  content: string;
  className?: string;
}

export default function BlogContent({ content, className = '' }: BlogContentProps) {
  // Simple content processing - convert basic markdown to HTML
  const processContent = (markdown: string) => {
    return markdown
      // Convert images FIRST (before other processing)
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="max-w-xl w-full h-auto rounded-lg shadow-md my-8 mx-auto" />')
      // Convert headers
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-serif text-primary mb-4 mt-6">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl md:text-3xl font-serif text-primary mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl md:text-4xl font-serif text-primary mb-6 mt-8 first:mt-0">$1</h1>')
      // Convert bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
      // Convert italic text
      .replace(/\*(.*?)\*/g, '<em class="italic text-primary">$1</em>')
      // Convert line breaks to paragraphs
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.trim() === '') return '';
        if (paragraph.startsWith('<h') || paragraph.startsWith('<ul') || paragraph.startsWith('<ol') || paragraph.startsWith('<img')) {
          return paragraph;
        }
        // Handle list items
        if (paragraph.includes('- ')) {
          const listItems = paragraph
            .split('\n')
            .filter(line => line.trim())
            .map(line => {
              if (line.trim().startsWith('- ')) {
                return `<li class="text-base md:text-lg leading-relaxed text-primary font-sans">${line.replace('- ', '')}</li>`;
              }
              return line;
            })
            .join('');
          return `<ul class="list-disc list-inside space-y-2 mb-6 text-primary">${listItems}</ul>`;
        }
        return `<p class="text-primary font-sans leading-relaxed mb-6 text-base md:text-lg">${paragraph}</p>`;
      })
      .join('\n');
  };

  return (
    <div 
      className={`prose prose-lg prose-gray max-w-none ${className}`}
      dangerouslySetInnerHTML={{ 
        __html: processContent(content) 
      }}
    />
  );
} 