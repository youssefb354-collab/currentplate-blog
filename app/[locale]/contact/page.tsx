'use client';

import { useState } from 'react';
import { sendEmail } from '@/app/actions';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(formData: FormData) {
    setStatus('loading');
    const result = await sendEmail(formData);

    if (result?.error) {
      setStatus('error');
    } else {
      setStatus('success');
    }
  }

  return (
    <main className="flex-1">
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-instrument-serif text-5xl text-graphite mb-8">
          Contact Us
        </h1>
        <p className="text-lg text-graphite/70 mb-12">
          Have a question, suggestion, or just want to say hello? We'd love to hear
          from you.
        </p>

        {status === 'success' ? (
          <div className="p-8 bg-secondary/30 border border-secondary rounded-2xl text-center">
            <h2 className="font-instrument-serif text-3xl text-graphite mb-2">Message Sent</h2>
            <p className="text-graphite/80">Thank you for reaching out. We will get back to you shortly!</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm font-medium text-primary hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-graphite mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-white border border-primary/20 rounded-lg focus:outline-none focus:border-primary smooth-transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-graphite mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-white border border-primary/20 rounded-lg focus:outline-none focus:border-primary smooth-transition"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-graphite mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className="w-full px-4 py-3 bg-white border border-primary/20 rounded-lg focus:outline-none focus:border-primary smooth-transition resize-none"
                placeholder="Your message..."
              />
            </div>
            
            {status === 'error' && (
              <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}