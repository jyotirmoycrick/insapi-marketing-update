import { useState } from 'react';
import { toast } from 'sonner';

interface UniversalFormMobileProps {
  formHeading: string;
  buttonText: string;
  pageId: string;
}

export function UniversalFormMobile({ formHeading, buttonText, pageId }: UniversalFormMobileProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    agreedToPolicy: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || '/api';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    if (!formData.agreedToPolicy) {
      toast.error('Please agree to the Privacy Policy');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          source: pageId,
          subject: `Contact Form Submission from ${pageId} page`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          agreedToPolicy: false,
        });
        toast.success('Form submitted successfully!');
      } else {
        toast.error(data.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full" data-testid="form-success-message-mobile">
        <div className="text-center py-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
          <p className="text-base text-gray-600 mb-4">
            Thanks for your response! We will reach you soon ASAP.
          </p>
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to your email address.
          </p>
          <button
            onClick={() => setShowSuccess(false)}
            className="mt-6 text-base text-blue-600 hover:text-blue-800 underline"
            data-testid="submit-another-btn-mobile"
          >
            Submit another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full" data-testid={`contact-form-mobile-${pageId}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {formHeading}
      </h2>
      
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="block text-base text-gray-700 font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter Your Full Name"
            className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            data-testid="input-fullname-mobile"
            disabled={isSubmitting}
          />
        </div>
        
        {/* Business Email */}
        <div>
          <label className="block text-base text-gray-700 font-semibold mb-2">
            Business Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Your Business Email"
            className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            data-testid="input-email-mobile"
            disabled={isSubmitting}
          />
        </div>
        
        {/* Phone Number */}
        <div>
          <label className="block text-base text-gray-700 font-semibold mb-2">
            Phone Number
          </label>
          <div className="flex">
            <div className="flex items-center justify-center px-4 py-3.5 border-2 border-r-0 border-gray-300 rounded-l-lg bg-white text-gray-700 font-medium text-base">
              +91
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="0000 000 000"
              className="flex-1 px-4 py-3.5 border-2 border-gray-300 rounded-r-lg text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              data-testid="input-phone-mobile"
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        {/* Privacy Policy Checkbox */}
        <div className="flex items-start pt-2">
          <input
            type="checkbox"
            name="agreedToPolicy"
            checked={formData.agreedToPolicy}
            onChange={handleInputChange}
            id={`privacy-mobile-${pageId}`}
            className="mt-1 w-5 h-5 border-2 border-gray-300 rounded focus:ring-0 focus:ring-offset-0 flex-shrink-0 accent-blue-500"
            data-testid="checkbox-privacy-mobile"
            disabled={isSubmitting}
          />
          <label htmlFor={`privacy-mobile-${pageId}`} className="ml-3 text-sm text-gray-600 leading-relaxed">
            I agree to the Privacy Policy and consent to being contacted.
          </label>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-500 hover:via-yellow-600 hover:to-orange-600 text-gray-900 font-bold py-4 rounded-lg transition-all text-base uppercase tracking-wide mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          data-testid="submit-form-btn-mobile"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            buttonText
          )}
        </button>
      </form>
    </div>
  );
}
