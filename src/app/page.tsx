'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [phoneOs, setPhoneOs] = useState<'ios' | 'android' | ''>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    if (!phoneOs) {
      setStatus('error');
      setMessage('Please select your device (iPhone or Android)');
      return;
    }

    setStatus('loading');

    try {
      if (!supabase) {
        throw new Error('Supabase not configured');
      }

      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, phone_os: phoneOs || null, created_at: new Date().toISOString() }]);

      if (error) {
        if (error.code === '23505') {
          setStatus('error');
          setMessage('This email is already on the waitlist!');
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setMessage("You're on the list! We'll notify you when we launch.");
        setEmail('');
        setPhoneOs('');
      }
    } catch (err) {
      setStatus('error');
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('Waitlist error:', err);
      setMessage(`Error: ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFE4E1] flex flex-col">
      {/* Header/Navigation */}
      <header className="w-full px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="text-3xl md:text-4xl font-bold text-[#3D2C5C]" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-1px' }}>
          Vannie
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 px-6 md:px-12 lg:px-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3D2C5C] leading-tight mb-6">
              For beauty lovers,<br />
              <span className="text-[#3D2C5C]">by beauty lovers.</span>
            </h1>

            <p className="text-[#6B7280] text-base md:text-lg leading-relaxed mb-8">
              Whether you&apos;re a skincare enthusiast, makeup collector, or any other type of beauty lover, in Vannie you can find a place to track your products, manage expiry dates, get usage insights, and never lose sight of your beauty collection again.
            </p>

            {/* Count Me In Form */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#3D2C5C] mb-2">
                Count Me In!
              </h2>
              <p className="text-[#6B7280] text-sm mb-4">
                Get the early access, news & updates.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email here*"
                  className="w-full px-4 py-3 border border-[#FFB380]/50 rounded-full text-center text-[#3D2C5C] placeholder-[#FFB380] bg-white focus:outline-none focus:border-[#FFB380] focus:ring-2 focus:ring-[#FFB380]/30 transition-all"
                  disabled={status === 'loading'}
                  required
                />

                {/* Phone OS Selection */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[#6B7280] text-sm">Which device do you use?</p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setPhoneOs('ios')}
                      disabled={status === 'loading'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                        phoneOs === 'ios'
                          ? 'bg-[#3D2C5C] text-white border-[#3D2C5C]'
                          : 'bg-white text-[#3D2C5C] border-[#FFB380]/50 hover:border-[#FFB380]'
                      } disabled:opacity-50`}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      iPhone
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhoneOs('android')}
                      disabled={status === 'loading'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                        phoneOs === 'android'
                          ? 'bg-[#3D2C5C] text-white border-[#3D2C5C]'
                          : 'bg-white text-[#3D2C5C] border-[#FFB380]/50 hover:border-[#FFB380]'
                      } disabled:opacity-50`}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24c-1.4-.59-2.94-.92-4.47-.92s-3.07.33-4.47.92L5.65 5.67c-.19-.29-.54-.38-.83-.22-.3.16-.42.54-.26.85L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
                      </svg>
                      Android
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#FFB380] to-[#FFB6C1] rounded-full text-[#3D2C5C] font-semibold hover:from-[#FFA060] hover:to-[#FFA0B0] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#FFB380]/30 hover:shadow-lg hover:shadow-[#FFB380]/40"
                >
                  {status === 'loading' ? 'Signing Up...' : 'Sign Me Up!'}
                </button>

                {/* Status message */}
                {status !== 'idle' && status !== 'loading' && (
                  <p className={`text-center text-sm ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                    {message}
                  </p>
                )}
              </form>
            </div>

            <div className="mb-4">
              <p className="text-[#3D2C5C] font-medium mb-3">Available soon on</p>
              <div className="flex gap-3">
                {/* App Store Button */}
                <button className="bg-[#3D2C5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2D1C4C] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-tight">Download on the</div>
                    <div className="text-sm font-semibold leading-tight">App Store</div>
                  </div>
                </button>
                {/* Google Play Button */}
                <button className="bg-[#3D2C5C] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#2D1C4C] transition-colors">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] leading-tight">Get it on</div>
                    <div className="text-sm font-semibold leading-tight">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Phone mockups */}
          <div className="flex-1 flex justify-center items-center gap-4 md:gap-6">
            {/* Phone 1 */}
            <div className="w-40 md:w-48 lg:w-56">
              <div className="bg-[#3D2C5C] rounded-[2.5rem] p-2 shadow-2xl shadow-[#3D2C5C]/30">
                <div className="bg-white rounded-[2rem] overflow-hidden aspect-[9/19.5] relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#3D2C5C] rounded-b-xl z-10"></div>
                  {/* Screen content */}
                  <Image
                    src="/images/screenshot.png"
                    alt="Vannie App Screenshot 1"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                  />
                </div>
              </div>
            </div>

            {/* Phone 2 */}
            <div className="w-40 md:w-48 lg:w-56">
              <div className="bg-[#3D2C5C] rounded-[2.5rem] p-2 shadow-2xl shadow-[#3D2C5C]/30">
                <div className="bg-white rounded-[2rem] overflow-hidden aspect-[9/19.5] relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#3D2C5C] rounded-b-xl z-10"></div>
                  {/* Screen content */}
                  <Image
                    src="/images/screenshot2.png"
                    alt="Vannie App Screenshot 2"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-sm text-[#6B7280]">
        <p>&copy; {new Date().getFullYear()} Vannie. All rights reserved.</p>
      </footer>
    </div>
  );
}
