import React, { useState } from 'react';
import { SendIcon } from './icons';

interface ContactPageProps {
  onGoBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onGoBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
        message: '',
        website: '' // honeypot field (should remain empty)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
        // Send to serverless endpoint
        fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(async (res) => {
                setIsSubmitting(false);
                if (res.ok) {
                      setIsSuccess(true);
                      setFormData({ name: '', phone: '', email: '', message: '', website: '' });
                    setTimeout(() => setIsSuccess(false), 4000);
                } else {
                    const data = await res.json().catch(() => ({}));
                    const err = data?.error || 'Failed to send message';
                    alert(err);
                }
            })
            .catch((err) => {
                setIsSubmitting(false);
                console.error(err);
                alert('Failed to send message. Please try again later.');
            });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen animate-fade-in">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Back Button */}
        <button 
          onClick={onGoBack}
          className="flex items-center gap-2 text-blue-500 mb-8 group hover:text-blue-400 transition-colors"
        >
            <span className="text-base transition-transform group-hover:-translate-x-1">&lt;</span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold">Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12 space-y-3">
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
                Contact
            </h1>
            <p className="text-secondary text-base md:text-lg max-w-xl mx-auto">
                Get in touch with me. I will get back to you as soon as possible.
            </p>
            <div className="h-px w-16 bg-primary/10 mx-auto mt-6"></div>
        </div>

        {/* Form Container */}
        <div className="max-w-xl mx-auto">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-primary mb-1">Send me a message</h2>
                <p className="text-secondary text-xs">
                    Fill out the form below and I will get back to you as soon as possible.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-primary">
                            Name <span className="text-blue-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                            className="w-full bg-surface border border-primary/10 rounded-lg px-3 py-2.5 text-sm text-primary placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-xs font-bold text-primary">
                            Phone <span className="text-blue-500">*</span>
                        </label>
                        <input 
                            type="tel" 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (123) xxx-xxxx"
                            required
                            className="w-full bg-surface border border-primary/10 rounded-lg px-3 py-2.5 text-sm text-primary placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-primary">
                        Email <span className="text-blue-500">*</span>
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="w-full bg-surface border border-primary/10 rounded-lg px-3 py-2.5 text-sm text-primary placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                    />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-primary">
                        Message <span className="text-blue-500">*</span>
                    </label>
                    <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or just say hello..."
                        required
                        rows={4}
                        className="w-full bg-surface border border-primary/10 rounded-lg px-3 py-2.5 text-sm text-primary placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none"
                    />
                </div>

                                {/* Honeypot - hidden field to deter spam bots */}
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    tabIndex={-1}
                                    style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                                />

                {/* Submit Button */}
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed group w-full md:w-auto text-sm"
                >
                    {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : isSuccess ? (
                        <span className="text-green-600">Message Sent!</span>
                    ) : (
                        <>
                            <SendIcon className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            <span>Send Message</span>
                        </>
                    )}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;