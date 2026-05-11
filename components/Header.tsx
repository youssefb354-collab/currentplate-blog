'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale(); // Added locale to ensure links work perfectly
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky-header sticky top-0 z-50 glass border-b border-primary/10 ${
        isScrolled ? 'shrunk' : 'py-4'
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="header-title font-instrument-serif text-2xl text-graphite">
          currentplate
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href={`/${locale}/recipes`} className="text-sm font-medium text-graphite hover:text-primary smooth-transition">
            {t('recipes')}
          </Link>
          
          <div
            className="relative"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <button className="text-sm font-medium text-graphite hover:text-primary smooth-transition py-2">
              Categories
            </button>
            {showMegaMenu && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[500px] glass rounded-lg p-6 grid grid-cols-2 gap-8 shadow-sm border border-primary/10">
                
                {/* Column 1: The Classics */}
                <div>
                  <h3 className="font-instrument-serif text-lg text-graphite mb-3 border-b border-primary/10 pb-2">The Classics</h3>
                  <ul className="space-y-3 mt-4">
                    {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map((item) => (
                      <li key={item}>
                        <Link href={`/${locale}/category/${item.toLowerCase()}`} className="text-sm text-graphite/70 hover:text-primary smooth-transition">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Specific Categories */}
                <div>
                  <h3 className="font-instrument-serif text-lg text-graphite mb-3 border-b border-primary/10 pb-2">By Category</h3>
                  <ul className="space-y-3 mt-4">
                    {['Salads', 'Pasta', 'Pizza', 'Juice', 'Sauce'].map((item) => (
                      <li key={item}>
                        <Link href={`/${locale}/category/${item.toLowerCase()}`} className="text-sm text-graphite/70 hover:text-primary smooth-transition flex items-center">
                          {/* Kept the elegant little dot from the previous design! */}
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary mr-3" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}
          </div>

          <Link href={`/${locale}/about`} className="text-sm font-medium text-graphite hover:text-primary smooth-transition">
            {t('about')}
          </Link>
          <Link href={`/${locale}/contact`} className="text-sm font-medium text-graphite hover:text-primary smooth-transition">
            {t('contact')}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="search"
              placeholder={t('search')}
              className="pl-8 pr-4 py-1.5 text-sm bg-base border border-primary/20 rounded-full focus:outline-none focus:border-primary w-40 lg:w-64 smooth-transition"
            />
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-graphite/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}