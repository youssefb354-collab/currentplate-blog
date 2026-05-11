'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('ads');

  return (
    <footer className="bg-graphite text-white/70 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-instrument-serif text-2xl text-white mb-4">
              currentplate
            </h3>
            <p className="text-sm leading-relaxed">
              A premium Food & Drink blog with curated recipes and culinary trends.
              Scandi-elegant, organic minimalism.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/recipes" className="hover:text-primary smooth-transition">Recipes</Link></li>
              <li><Link href="/about" className="hover:text-primary smooth-transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary smooth-transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-primary smooth-transition">{t('privacyPolicy')}</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary smooth-transition">{t('cookiePolicy')}</Link></li>
              <li><Link href="/terms" className="hover:text-primary smooth-transition">{t('termsOfService')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} currentplate. All rights reserved.</p>
          <p className="mt-1 text-xs text-white/40">
            This site uses cookies and is served ads by Google AdSense.
          </p>
        </div>
      </div>
    </footer>
  );
}
