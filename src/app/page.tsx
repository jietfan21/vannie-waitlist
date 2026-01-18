'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus('loading');

    try {
      if (!supabase) {
        throw new Error('Supabase not configured');
      }

      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, created_at: new Date().toISOString() }]);

      if (error) {
        if (error.code === '23505') {
          setStatus('error');
          setMessage('This email is already on the waitlist!');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage('You\'re on the list! We\'ll be in touch soon.');
        setEmail('');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="max-w-xl w-full text-center space-y-8">
        {/* Logo/Brand */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Vannie
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your smart inventory companion is coming soon
          </p>
        </div>

        {/* Value proposition */}
        <div className="space-y-3 text-gray-500 dark:text-gray-400">
          <p>Track your products effortlessly. Get insights instantly.</p>
          <p>Be the first to know when we launch.</p>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-80"
              disabled={status === 'loading'}
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>

          {/* Status message */}
          {status !== 'idle' && status !== 'loading' && (
            <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </form>

        {/* Social proof or features */}
        <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Barcode scanning</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Smart tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Usage insights</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Vannie. All rights reserved.</p>
      </footer>
    </div>
  );
}
