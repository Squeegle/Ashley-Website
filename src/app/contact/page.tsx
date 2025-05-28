'use client';

import { PageBanner, Container, Section } from '@/components/layout';
import { Mail, Phone, MapPin, Clock, Upload, X } from 'lucide-react';
import { useState, FormEvent, ChangeEvent } from 'react';

/**
 * Contact Page Component
 * Features:
 * - Hero banner with page title
 * - Contact information section
 * - Contact form with validation
 * - File upload functionality
 * - Form submission handling
 */
export default function ContactPage() {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budgetRange: '',
    message: ''
  });

  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Form validation errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Project type options
  const projectTypes = [
    { value: '', label: 'Select Project Type' },
    { value: 'residential', label: 'Residential Design' },
    { value: 'commercial', label: 'Commercial Space' },
    { value: 'consultation', label: 'Design Consultation' },
    { value: 'renovation', label: 'Home Renovation' },
    { value: 'styling', label: 'Interior Styling' }
  ];

  // Budget range options
  const budgetRanges = [
    { value: '', label: 'Select Budget Range' },
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-30k', label: '$15,000 - $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: 'over-50k', label: 'Over $50,000' },
    { value: 'discuss', label: 'Let&apos;s Discuss' }
  ];

  // Contact information
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@ashleyrose.com',
      href: 'mailto:hello@ashleyrose.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '(555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Los Angeles, CA',
      href: null
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Mon-Fri: 9AM-6PM',
      href: null
    }
  ];

  /**
   * Handle input change for form fields
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /**
   * Handle file upload
   */
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxFiles = 5;
    const maxSize = 10 * 1024 * 1024; // 10MB per file

    // Validate file constraints
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          files: `File "${file.name}" is too large. Maximum size is 10MB.`
        }));
        return false;
      }
      return true;
    });

    // Check total file count
    if (uploadedFiles.length + validFiles.length > maxFiles) {
      setErrors(prev => ({
        ...prev,
        files: `Maximum ${maxFiles} files allowed.`
      }));
      return;
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
    setErrors(prev => ({ ...prev, files: '' }));
  };

  /**
   * Remove uploaded file
   */
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Validate form data
   */
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your project';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details about your project (minimum 10 characters)';
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone.trim() && !/^[\+]?[0-9\-\(\)\s]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form Data:', formData);
      console.log('Uploaded Files:', uploadedFiles);
      
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budgetRange: '',
        message: ''
      });
      setUploadedFiles([]);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page Banner */}
      <PageBanner 
        title="Let's Create Something Beautiful" 
        description="Ready to transform your space? Get in touch to start your design journey."
        imageSrc="/images/contact-hero.jpg"
        imageAlt="Modern interior design consultation space"
      />

      {/* Contact Information Section */}
      <Section className="py-16 lg:py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-black mb-6 font-bold">
              Get In Touch
            </h2>
            <p className="text-gray-800 max-w-2xl mx-auto leading-relaxed font-semibold">
              Whether you&apos;re planning a complete home makeover or need design guidance for a single room, 
              I&apos;m here to help bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((item) => {
              const IconComponent = item.icon;
              const content = (
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors duration-300">
                    <IconComponent size={24} className="text-gray-700" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">{item.label}</h3>
                  <p className="text-gray-800 font-semibold">{item.value}</p>
                </div>
              );

              return item.href ? (
                <a key={item.label} href={item.href} className="block hover:scale-105 transition-transform duration-300">
                  {content}
                </a>
              ) : (
                <div key={item.label}>
                  {content}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section className="py-16 lg:py-24 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif text-black mb-6 font-bold">
                Start Your Project
              </h2>
              <p className="text-gray-800 leading-relaxed font-semibold">
                Tell us about your project and vision. We&apos;ll get back to you within 24 hours to discuss how we can help.
              </p>
            </div>

            {isSubmitted ? (
              /* Success Message */
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail size={24} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Thank You!</h3>
                <p className="text-gray-800 mb-6 font-semibold">
                  Your message has been sent successfully. I&apos;ll review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* Contact Form */
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-black mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-black bg-white ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your full name"
                        style={{ color: '#111827 !important' }}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600 font-semibold">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-black mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-black bg-white ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                        style={{ color: '#111827 !important' }}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600 font-semibold">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone and Project Type Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-black mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-black bg-white ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(555) 123-4567"
                        style={{ color: '#111827 !important' }}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600 font-semibold">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="projectType" className="block text-sm font-bold text-black mb-2">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-black bg-white ${
                          errors.projectType ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        {projectTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && <p className="mt-1 text-sm text-red-600 font-semibold">{errors.projectType}</p>}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label htmlFor="budgetRange" className="block text-sm font-bold text-black mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budgetRange"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-black bg-white ${
                        errors.budgetRange ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      {budgetRanges.map(range => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-black mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors duration-200 text-black bg-white ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tell us about your project, style preferences, timeline, and any specific requirements..."
                      style={{ color: '#111827 !important' }}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600 font-semibold">{errors.message}</p>}
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Inspiration Images (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                      <Upload size={32} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-black mb-2 font-bold">
                        Upload images that inspire your vision
                      </p>
                      <p className="text-sm text-gray-700 mb-4 font-semibold">
                        Max 5 files, 10MB each. JPG, PNG, PDF accepted.
                      </p>
                      <label className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer transition-colors duration-200">
                        <input
                          type="file"
                          multiple
                          accept="image/*,.pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        Choose Files
                      </label>
                    </div>
                    {errors.files && <p className="mt-1 text-sm text-red-600 font-semibold">{errors.files}</p>}

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md">
                            <span className="text-sm text-black truncate font-semibold">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    {errors.submit && (
                      <p className="mb-4 text-sm text-red-600 font-semibold">{errors.submit}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <p className="mt-2 text-sm text-gray-700 font-semibold">
                      * Required fields
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
} 