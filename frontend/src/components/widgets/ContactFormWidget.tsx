import React, { useState, CSSProperties } from 'react';

interface ContactFormWidgetProps {
  content: {
    fields: Array<{
      type: string;
      name: string;
      label: string;
      required: boolean;
    }>;
    buttonText: string;
    successMessage: string;
  };
  styles: Record<string, any>;
  settings?: Record<string, any>;
  isPreview?: boolean;
}

export function ContactFormWidget({ content, styles, settings, isPreview }: ContactFormWidgetProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPreview) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({});
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerStyles: CSSProperties = {
    ...styles,
  };

  const fields = content.fields || [];

  if (success) {
    return (
      <div style={containerStyles} className="widget-contact-form">
        <div className="p-6 bg-green-50 border-2 border-green-500 rounded-lg text-center">
          <div className="text-4xl mb-2">✅</div>
          <p className="text-green-700 font-medium">
            {content.successMessage || 'Thank you! We\'ll be in touch soon.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={containerStyles} className="widget-contact-form space-y-4">
      {fields.map((field, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={submitting || isPreview}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? 'Sending...' : content.buttonText || 'Send Message'}
      </button>
    </form>
  );
}
