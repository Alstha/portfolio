'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (_error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-0.5 bg-gradient-accent rounded-full"></div>
            <span className="text-accent-400 font-medium tracking-wider text-sm">CONTACT</span>
            <div className="w-8 h-0.5 bg-gradient-accent rounded-full"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-premium-50 mb-6 leading-tight">
            Get in <span className="gradient-text hover-scale">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-accent mx-auto rounded-full hover-glow mb-6"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info - Compact Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass rounded-2xl p-6 border border-premium-600/20 card-hover group">
              <h3 className="text-xl font-bold text-premium-50 mb-3 hover-scale">Let&apos;s Connect</h3>
              <p className="text-premium-300 text-sm leading-relaxed hover-bright">
                I&apos;m always excited to discuss AI/ML projects, collaborations, or just chat about technology and innovation.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 border border-premium-600/20 card-hover group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-sm">📍</span>
                </div>
                <div>
                  <h4 className="text-premium-50 font-semibold text-sm hover-scale">Location</h4>
                  <p className="text-premium-300 text-sm hover-bright">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-premium-600/20 card-hover group cursor-pointer" 
                 onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=alsthadotcom@gmail.com', '_blank')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-sm">📧</span>
                </div>
                <div>
                  <h4 className="text-premium-50 font-semibold text-sm hover-scale">Email</h4>
                  <p className="text-premium-300 text-sm hover-bright group-hover:text-accent-400 transition-colors">alsthadotcom@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-premium-600/20 card-hover group cursor-pointer"
                 onClick={() => window.open('tel:+9779761856566', '_blank')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-sm">📱</span>
                </div>
                <div>
                  <h4 className="text-premium-50 font-semibold text-sm hover-scale">Phone</h4>
                  <p className="text-premium-300 text-sm hover-bright group-hover:text-accent-400 transition-colors">+977-9761856566</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 border border-premium-600/20 card-hover group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-sm">🎓</span>
                </div>
                <div>
                  <h4 className="text-premium-50 font-semibold text-sm hover-scale">Education</h4>
                  <p className="text-premium-300 text-sm hover-bright">Islington College</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Enhanced */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-10 border border-premium-600/20 card-hover">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-premium-50 font-semibold mb-3 group-hover:text-accent-400 transition-colors">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-premium-800/50 border border-premium-600/30 rounded-xl text-premium-50 placeholder-premium-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 hover:border-premium-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-premium-50 font-semibold mb-3 group-hover:text-accent-400 transition-colors">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-premium-800/50 border border-premium-600/30 rounded-xl text-premium-50 placeholder-premium-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 hover:border-premium-500"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-premium-50 font-semibold mb-3 group-hover:text-accent-400 transition-colors">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-5 py-4 bg-premium-800/50 border border-premium-600/30 rounded-xl text-premium-50 placeholder-premium-400 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-all duration-300 hover:border-premium-500 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-accent hover:bg-gradient-accent/90 text-white font-bold py-4 px-8 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-500/25 group"
                >
                  <span className="flex items-center justify-center space-x-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </span>
                </button>

                {submitStatus === 'success' && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-center py-4 px-6 rounded-xl hover-bright">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl">✓</span>
                      <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-center py-4 px-6 rounded-xl hover-bright">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-xl">⚠</span>
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section Divider */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-accent rounded-full shadow-lg"></div>
    </section>
  )
} 