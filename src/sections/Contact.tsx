import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { LinkedinIcon } from '../components/Icons';
import { personalInfo } from '../data/portfolio';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: 'General Inquiry / Collaboration',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message (minimum 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    /*
     * --------------------------------------------------------------------------
     * TODO: Backend / Email Service Integration
     * --------------------------------------------------------------------------
     * You can replace this mailto trigger with an API call to services like:
     * - Resend (https://resend.com)
     * - EmailJS (https://www.emailjs.com)
     * - Formspree (https://formspree.io/f/YOUR_FORM_ID)
     *
     * Example:
     * await fetch('/api/contact', {
     *   method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify(formData),
     * });
     * --------------------------------------------------------------------------
     */

    // Prepare mailto link with encoded URI parameters
    const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${formData.subject} - from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.subject}\n\nMessage:\n${formData.message}`
    );

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    setSubmitted(true);

    // Trigger user's mail client
    window.location.href = mailtoUrl;

    // Reset form after short feedback window
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry / Collaboration',
        message: '',
      });
      setErrors({});
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-28 border-t border-[#D4D4D4] bg-white text-[#111827] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-2 mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#050505] tracking-wider uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
            <span>// 06 — CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] font-sans tracking-tight">
            Initiate Contact
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
            Interested in discussing FPGA system architectures, quantized edge deep learning, embedded sensor telemetry, or engineering career opportunities? Let's connect.
          </p>
        </div>

        {/* Two-Column Grid: Contact Information & Front-End Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Left Column: Direct Communication Channels & Status Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Status Telemetry Card */}
            <div className="p-5 rounded-2xl bg-[#F4F4F5] border border-[#D4D4D4] shadow-sm font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#D4D4D4] pb-2.5">
                <span className="text-[#050505] font-bold">// STATUS TELEMETRY</span>
                <span className="inline-flex items-center gap-1.5 text-[#050505] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#050505] animate-pulse" />
                  CHANNELS ONLINE
                </span>
              </div>
              <div className="flex justify-between text-[#374151]">
                <span className="text-[#6B7280]">Availability:</span>
                <span className="text-[#050505] font-bold">Full-Time Roles &amp; R&amp;D</span>
              </div>
              <div className="flex justify-between text-[#374151]">
                <span className="text-[#6B7280]">Response Latency:</span>
                <span className="text-[#111827] font-semibold">&lt; 24 Hours</span>
              </div>
              <div className="flex justify-between text-[#374151]">
                <span className="text-[#6B7280]">Local Time:</span>
                <span className="text-[#050505] font-semibold">IST (UTC +5:30)</span>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              {/* Email Card */}
              <div className="group p-4 rounded-xl bg-white border border-[#D4D4D4] hover:border-[#050505] transition-all flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#F4F4F5] border border-[#D4D4D4] text-[#050505]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[#6B7280] uppercase font-semibold">EMAIL ADDRESS</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-mono text-[#111827] hover:text-[#050505] font-semibold transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  className="p-2 rounded-lg text-[#6B7280] hover:text-[#050505] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-[#050505]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="group p-4 rounded-xl bg-white border border-[#D4D4D4] hover:border-[#050505] transition-all flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#F4F4F5] border border-[#D4D4D4] text-[#050505]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[#6B7280] uppercase font-semibold">TELEPHONE // WHATSAPP</div>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-sm font-mono text-[#111827] hover:text-[#050505] font-semibold transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(personalInfo.phone, 'phone')}
                  className="p-2 rounded-lg text-[#6B7280] hover:text-[#050505] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
                  title="Copy phone to clipboard"
                  aria-label="Copy phone number"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-[#050505]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* LinkedIn Card */}
              <div className="group p-4 rounded-xl bg-white border border-[#D4D4D4] hover:border-[#050505] transition-all flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#F4F4F5] border border-[#D4D4D4] text-[#050505]">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-[#6B7280] uppercase font-semibold">LINKEDIN PROFILE</div>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono text-[#111827] hover:text-[#050505] font-semibold transition-colors"
                    >
                      linkedin.com/in/tanuj-mistry
                    </a>
                  </div>
                </div>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[#6B7280] hover:text-[#050505] hover:bg-[#F4F4F5] transition-colors"
                  aria-label="Open LinkedIn"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-white border border-[#D4D4D4] flex items-center gap-3.5 shadow-sm">
                <div className="p-2.5 rounded-lg bg-[#F4F4F5] border border-[#D4D4D4] text-[#050505]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#6B7280] uppercase font-semibold">LOCATION</div>
                  <div className="text-sm font-mono text-[#111827] font-semibold">
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Front-End Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D4D4D4] shadow-sm text-[#111827]">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[#D4D4D4]">
                <MessageSquare className="w-4 h-4 text-[#050505]" />
                <h3 className="text-lg font-bold text-[#111827] font-sans">
                  Direct Dispatch Form
                </h3>
              </div>

              {/* Success Banner */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-lg bg-[#F4F4F5] border border-[#050505] flex items-start gap-3 text-[#111827] text-xs font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#050505]" />
                    <div>
                      <span className="font-bold block mb-0.5">Telemetry Form Dispatched!</span>
                      Your email application should now open with your message pre-filled. If not, feel free to write to me directly at{' '}
                      <span className="underline font-bold">{personalInfo.email}</span>.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-mono text-[#374151] font-semibold">
                      Your Name <span className="text-[#050505]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#F9FAFB] border ${
                        errors.name ? 'border-red-500' : 'border-[#D4D4D4]'
                      } focus:border-[#050505] focus:ring-1 focus:ring-[#050505] text-[#111827] font-sans text-sm outline-none transition-colors placeholder:text-[#9CA3AF]`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-mono text-[#374151] font-semibold">
                      Email Address <span className="text-[#050505]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="alex@organization.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#F9FAFB] border ${
                        errors.email ? 'border-red-500' : 'border-[#D4D4D4]'
                      } focus:border-[#050505] focus:ring-1 focus:ring-[#050505] text-[#111827] font-sans text-sm outline-none transition-colors placeholder:text-[#9CA3AF]`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-mono text-[#374151] font-semibold">
                    Subject / Discussion Topic
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#F9FAFB] border border-[#D4D4D4] focus:border-[#050505] focus:ring-1 focus:ring-[#050505] text-[#111827] font-sans text-sm outline-none transition-colors"
                  >
                    <option value="FPGA / Hardware Architecture Inquiry">FPGA / Hardware Architecture Inquiry</option>
                    <option value="Edge AI / Deep Learning Deployment">Edge AI / Deep Learning Deployment</option>
                    <option value="Embedded Systems / CAN Telemetry">Embedded Systems / CAN Telemetry</option>
                    <option value="Full-Time Engineering Role Opportunity">Full-Time Engineering Role Opportunity</option>
                    <option value="General Inquiry / Collaboration">General Inquiry / Collaboration</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-mono text-[#374151] font-semibold">
                    Message <span className="text-[#050505]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Describe your project, team opportunity, or engineering inquiry..."
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#F9FAFB] border ${
                      errors.message ? 'border-red-500' : 'border-[#D4D4D4]'
                    } focus:border-[#050505] focus:ring-1 focus:ring-[#050505] text-[#111827] font-sans text-sm outline-none transition-colors placeholder:text-[#9CA3AF] resize-y`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#050505] text-white font-mono text-xs font-bold hover:bg-neutral-800 shadow-sm transition-all duration-200 focus:outline-none cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmitting Message (mailto:)</span>
                  </button>
                  <span className="block mt-2 text-[10px] font-mono text-[#6B7280]">
                    // Direct dispatch triggers your native mail client with validated payload.
                  </span>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
