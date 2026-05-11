'use client';

import { useState, FormEvent } from 'react';
import { subscribeToNewsletter } from '@/app/actions';

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Stops the translation library from breaking the form
    setStatus('loading');
    
    const formData = new FormData(e.currentTarget);
    const result = await subscribeToNewsletter(formData);

    if (result?.error) {
      setStatus('error');
    } else {
      setStatus('success');
    }
  }

  if (status === 'success') {
    return (
      <div className="p-6 bg-white/60 rounded-2xl border border-primary/20 max-w-lg mx-auto shadow-sm">
        <h3 className="font-instrument-serif text-2xl text-graphite mb-2">Welcome to the Table!</h3>
        <p className="text-graphite/70">Your seat is saved. Keep an eye on your inbox for our next curated menu.</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="flex-1 px-6 py-3.5 rounded-full border border-primary/20 focus:outline-none focus:border-primary bg-white/80 smooth-transition"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-3.5 rounded-full bg-primary text-white font-medium hover:bg-primary/90 smooth-transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Joining...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 text-sm absolute -bottom-8 w-full text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}