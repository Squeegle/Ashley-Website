/**
 * Newsletter Email Template Generator
 * 
 * This module generates beautiful HTML email templates for newsletters.
 * The design is inspired by modern lifestyle blogger newsletters with:
 * - Warm, inviting color palette (cream, sage green, dusty pink)
 * - Elegant serif fonts for headings
 * - Clean, mobile-responsive layout
 * - Personal greeting section
 * - Blog post highlights
 * - Shop section with product links
 * - Website promotion section
 * - Footer with social links and unsubscribe
 */

import { Newsletter } from './newsletter-content';
import { BlogPost } from '@/types';
import { siteConfig } from './config';

/**
 * Interface for blog post data formatted for the newsletter
 */
export interface NewsletterBlogPost {
  title: string;
  excerpt: string;
  imageUrl: string;
  linkUrl: string;
}

/**
 * Color palette matching the website aesthetic
 * Inspired by the Flodesk template style
 */
const colors = {
  // Background colors
  bgPrimary: '#FAF8F5',      // Warm cream/off-white
  bgSecondary: '#F5F0EB',    // Slightly darker cream
  bgAccent: '#A3B3A2',       // Sage green (from website)
  bgPink: '#E8C4C4',         // Dusty pink accent
  
  // Text colors
  textPrimary: '#454140',    // Dark brown (from website)
  textSecondary: '#6B6867',  // Medium gray-brown
  textLight: '#FFFFFF',      // White
  
  // Button colors
  buttonPrimary: '#454140',  // Dark brown
  buttonHover: '#353130',    // Darker brown
  
  // Border colors
  border: '#E5E0DB',         // Light border
  borderPink: '#D4A5A5',     // Pink border accent
};

/**
 * Convert markdown-style line breaks to HTML paragraphs
 * 
 * @param text - The markdown text
 * @returns HTML formatted text with paragraphs
 */
function markdownToHtml(text: string): string {
  // Split by double line breaks for paragraphs
  const paragraphs = text.split(/\n\n+/);
  
  return paragraphs
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p style="margin: 0 0 20px 0;">${p.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/**
 * Generate the complete HTML email template
 * 
 * @param newsletter - The newsletter content from markdown
 * @param blogPosts - Array of blog posts to feature
 * @param unsubscribeUrl - The unique unsubscribe URL for this subscriber
 * @param baseUrl - The base URL of the website
 * @returns Complete HTML string for the email
 */
export function generateNewsletterHTML(
  newsletter: Newsletter,
  blogPosts: NewsletterBlogPost[],
  unsubscribeUrl: string,
  baseUrl: string = siteConfig.url
): string {
  const messageHtml = markdownToHtml(newsletter.message);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${newsletter.subject}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    /* Reset styles for email clients */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: ${colors.bgPink};
    }
    
    /* Responsive styles */
    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 10px !important;
      }
      .content-block {
        padding: 20px !important;
      }
      .blog-image {
        width: 100% !important;
        height: auto !important;
      }
      .shop-item {
        width: 45% !important;
      }
      .two-column {
        display: block !important;
        width: 100% !important;
      }
      .two-column td {
        display: block !important;
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.bgPink}; font-family: Georgia, 'Times New Roman', serif;">
  
  <!-- Preheader text (hidden but shows in email preview) -->
  <div style="display: none; max-height: 0; overflow: hidden;">
    ${newsletter.previewText}
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- Main container -->
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.bgPink};">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        
        <!-- Email content wrapper -->
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" class="container" style="max-width: 600px; background-color: ${colors.bgPrimary};">
          
          <!-- ============================================ -->
          <!-- HEADER SECTION - Personal Greeting -->
          <!-- ============================================ -->
          <tr>
            <td style="padding: 40px 40px 30px 40px; background-color: ${colors.bgPrimary};">
              
              <!-- Greeting/Salutation -->
              <h1 style="margin: 0 0 25px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 28px; font-weight: normal; color: ${colors.textPrimary}; text-align: center;">
                ${newsletter.salutation}
              </h1>
              
              <!-- Personal Message -->
              <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 16px; line-height: 1.8; color: ${colors.textPrimary}; text-align: center;">
                ${messageHtml}
              </div>
              
              <!-- Sign off -->
              <p style="margin: 30px 0 5px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: ${colors.textPrimary}; text-align: center;">
                ${newsletter.signOff}
              </p>
              <p style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 18px; font-style: italic; color: ${colors.textPrimary}; text-align: center;">
                ${newsletter.signature}
              </p>
              
            </td>
          </tr>

          <!-- ============================================ -->
          <!-- BLOG SECTION - Catch up on the blog! -->
          <!-- ============================================ -->
          ${blogPosts.length > 0 ? `
          <tr>
            <td style="padding: 0;">
              
              <!-- Section Header -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px 40px; background-color: ${colors.bgAccent};">
                    <h2 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-style: italic; font-weight: normal; color: ${colors.textLight}; text-align: center;">
                      Catch up on the blog!
                    </h2>
                  </td>
                </tr>
              </table>
              
              <!-- Blog Posts -->
              ${blogPosts.map((post, index) => `
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${index % 2 === 0 ? colors.bgPrimary : colors.bgSecondary};">
                <tr class="two-column">
                  ${index % 2 === 0 ? `
                  <!-- Image on left for even posts -->
                  <td width="45%" valign="top" style="padding: 20px;">
                    <a href="${post.linkUrl}" target="_blank">
                      <img src="${post.imageUrl}" alt="${post.title}" width="240" class="blog-image" style="display: block; width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
                    </a>
                  </td>
                  <td width="55%" valign="middle" style="padding: 20px;">
                    <p style="margin: 0 0 5px 0; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${colors.textSecondary};">
                      From The Blog
                    </p>
                    <h3 style="margin: 0 0 15px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 20px; font-weight: normal; color: ${colors.textPrimary};">
                      ${post.title}
                    </h3>
                    <div style="width: 80px; height: 1px; background-color: ${colors.textPrimary}; margin: 0 0 15px 0;"></div>
                    <a href="${post.linkUrl}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: ${colors.bgSecondary}; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${colors.textPrimary}; text-decoration: none;">
                      CHECK IT OUT
                    </a>
                  </td>
                  ` : `
                  <!-- Image on right for odd posts -->
                  <td width="55%" valign="middle" style="padding: 20px; text-align: right;">
                    <p style="margin: 0 0 5px 0; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: ${colors.textSecondary};">
                      From The Blog
                    </p>
                    <h3 style="margin: 0 0 15px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 20px; font-weight: normal; color: ${colors.textPrimary};">
                      ${post.title}
                    </h3>
                    <div style="width: 80px; height: 1px; background-color: ${colors.textPrimary}; margin: 0 0 15px 0; margin-left: auto;"></div>
                    <a href="${post.linkUrl}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: ${colors.bgSecondary}; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${colors.textPrimary}; text-decoration: none;">
                      CHECK IT OUT
                    </a>
                  </td>
                  <td width="45%" valign="top" style="padding: 20px;">
                    <a href="${post.linkUrl}" target="_blank">
                      <img src="${post.imageUrl}" alt="${post.title}" width="240" class="blog-image" style="display: block; width: 100%; max-width: 240px; height: auto; border-radius: 4px;">
                    </a>
                  </td>
                  `}
                </tr>
              </table>
              `).join('')}
              
            </td>
          </tr>
          ` : ''}

          <!-- ============================================ -->
          <!-- SHOP SECTION - Shop My Favorites -->
          <!-- ============================================ -->
          <tr>
            <td style="padding: 0;">
              
              <!-- Section Header -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 20px 40px; background-color: ${colors.bgPink};">
                    <h2 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-style: italic; font-weight: normal; color: ${colors.textLight}; text-align: center;">
                      Shop My Favorites
                    </h2>
                  </td>
                </tr>
              </table>
              
              <!-- Shop Link -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${colors.bgSecondary};">
                <tr>
                  <td style="padding: 30px 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" style="padding: 20px;">
                          <p style="margin: 0 0 20px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: ${colors.textPrimary}; text-align: center;">
                            Discover my favorite home decor, fashion finds, and lifestyle essentials!
                          </p>
                          <a href="https://www.shopltk.com/explore/Ashley_Rose/" target="_blank" style="display: inline-block; padding: 15px 40px; background-color: ${colors.buttonPrimary}; font-family: Arial, sans-serif; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: ${colors.textLight}; text-decoration: none; border-radius: 4px;">
                            SHOP MY FAVORITES
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>

          <!-- ============================================ -->
          <!-- FIND ME ON SECTION - Website Link -->
          <!-- ============================================ -->
          <tr>
            <td style="padding: 0; background-color: ${colors.bgPrimary};">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr class="two-column">
                  <!-- Photo -->
                  <td width="45%" valign="top" style="padding: 30px 20px 30px 40px;">
                    <img src="${baseUrl}/images/ashley-portrait.jpg" alt="Ashley Rose" width="220" style="display: block; width: 100%; max-width: 220px; height: auto; border-radius: 4px;">
                  </td>
                  <!-- Content -->
                  <td width="55%" valign="middle" style="padding: 30px 40px 30px 20px;">
                    <p style="margin: 0 0 5px 0; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${colors.textSecondary};">
                      Find Me On....
                    </p>
                    <h3 style="margin: 0 0 15px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 32px; font-weight: normal; color: ${colors.textPrimary};">
                      At home with Rose
                    </h3>
                    <p style="margin: 0 0 20px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 14px; line-height: 1.6; color: ${colors.textSecondary};">
                      Visit my website for more DIY projects, home decor inspiration, and behind-the-scenes content!
                    </p>
                    <a href="${baseUrl}" target="_blank" style="display: inline-block; padding: 12px 25px; background-color: ${colors.buttonPrimary}; font-family: Arial, sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: ${colors.textLight}; text-decoration: none;">
                      TAKE ME THERE!
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ============================================ -->
          <!-- FOOTER SECTION -->
          <!-- ============================================ -->
          <tr>
            <td style="padding: 40px; background-color: ${colors.bgPrimary}; border-top: 1px solid ${colors.border};">
              
              <!-- Social Media Icons -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 25px;">
                    <!-- Instagram -->
                    <a href="${siteConfig.links.instagram}" target="_blank" style="display: inline-block; margin: 0 8px; width: 40px; height: 40px; border: 2px solid ${colors.textPrimary}; border-radius: 50%; text-align: center; line-height: 36px; text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="18" height="18" style="vertical-align: middle;">
                    </a>
                    <!-- Facebook -->
                    <a href="${siteConfig.links.facebook}" target="_blank" style="display: inline-block; margin: 0 8px; width: 40px; height: 40px; border: 2px solid ${colors.textPrimary}; border-radius: 50%; text-align: center; line-height: 36px; text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" width="18" height="18" style="vertical-align: middle;">
                    </a>
                    <!-- YouTube -->
                    <a href="${siteConfig.links.youtube}" target="_blank" style="display: inline-block; margin: 0 8px; width: 40px; height: 40px; border: 2px solid ${colors.textPrimary}; border-radius: 50%; text-align: center; line-height: 36px; text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174883.png" alt="YouTube" width="18" height="18" style="vertical-align: middle;">
                    </a>
                    <!-- Pinterest -->
                    <a href="${siteConfig.links.pinterest}" target="_blank" style="display: inline-block; margin: 0 8px; width: 40px; height: 40px; border: 2px solid ${colors.textPrimary}; border-radius: 50%; text-align: center; line-height: 36px; text-decoration: none;">
                      <img src="https://cdn-icons-png.flaticon.com/512/174/174863.png" alt="Pinterest" width="18" height="18" style="vertical-align: middle;">
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Unsubscribe Link -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding-top: 15px; border-top: 1px solid ${colors.border};">
                    <p style="margin: 15px 0 0 0; font-family: Arial, sans-serif; font-size: 12px; color: ${colors.textSecondary};">
                      <a href="${unsubscribeUrl}" target="_blank" style="color: ${colors.textSecondary}; text-decoration: underline;">Unsubscribe</a>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="${baseUrl}" target="_blank" style="color: ${colors.textSecondary}; text-decoration: underline;">Visit Website</a>
                    </p>
                    <p style="margin: 15px 0 0 0; font-family: Arial, sans-serif; font-size: 11px; color: ${colors.textSecondary};">
                      © ${new Date().getFullYear()} At home with Rose. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>

        </table>
        <!-- End email content wrapper -->
        
      </td>
    </tr>
  </table>
  <!-- End main container -->

</body>
</html>
  `.trim();
}

/**
 * Generate a plain text version of the newsletter
 * 
 * @param newsletter - The newsletter content
 * @param blogPosts - Array of blog posts to feature
 * @param unsubscribeUrl - The unsubscribe URL
 * @param baseUrl - The base URL of the website
 * @returns Plain text version of the email
 */
export function generateNewsletterPlainText(
  newsletter: Newsletter,
  blogPosts: NewsletterBlogPost[],
  unsubscribeUrl: string,
  baseUrl: string = siteConfig.url
): string {
  let text = `${newsletter.salutation}\n\n`;
  text += `${newsletter.message}\n\n`;
  text += `${newsletter.signOff}\n${newsletter.signature}\n\n`;
  text += `---\n\n`;

  if (blogPosts.length > 0) {
    text += `CATCH UP ON THE BLOG\n\n`;
    blogPosts.forEach(post => {
      text += `${post.title}\n`;
      text += `${post.excerpt}\n`;
      text += `Read more: ${post.linkUrl}\n\n`;
    });
    text += `---\n\n`;
  }

  text += `SHOP MY FAVORITES\n`;
  text += `Visit: https://www.shopltk.com/explore/Ashley_Rose/\n\n`;
  text += `---\n\n`;

  text += `FIND ME ON THE WEB\n`;
  text += `Visit my website: ${baseUrl}\n\n`;
  text += `---\n\n`;

  text += `Follow me on social media:\n`;
  text += `Instagram: ${siteConfig.links.instagram}\n`;
  text += `Facebook: ${siteConfig.links.facebook}\n`;
  text += `YouTube: ${siteConfig.links.youtube}\n\n`;

  text += `---\n\n`;
  text += `To unsubscribe, visit: ${unsubscribeUrl}\n`;
  text += `© ${new Date().getFullYear()} At home with Rose. All rights reserved.\n`;

  return text;
}

/**
 * Helper function to convert blog posts from the database format to newsletter format
 * 
 * @param posts - Array of BlogPost objects from the database
 * @param baseUrl - The base URL of the website
 * @returns Array of blog post objects formatted for the newsletter
 */
export function formatBlogPostsForNewsletter(
  posts: BlogPost[],
  baseUrl: string = siteConfig.url
): NewsletterBlogPost[] {
  return posts.map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: post.featuredImage.startsWith('http') 
      ? post.featuredImage 
      : `${baseUrl}${post.featuredImage}`,
    linkUrl: `${baseUrl}/blog/${post.slug}`,
  }));
}

