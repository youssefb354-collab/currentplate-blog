import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('ads');

  return (
    <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-instrument-serif text-5xl text-graphite mb-8">
        {t('privacyPolicy')}
      </h1>
      <div className="space-y-6 text-graphite/80 leading-[1.5]">
        <p>
          Your privacy is important to us. This Privacy Policy explains how
          currentplate collects, uses, and protects your personal information.
        </p>
        <h2 className="font-instrument-serif text-2xl text-graphite mt-8 mb-4">
          Information We Collect
        </h2>
        <p>
          We collect information you provide directly when you contact us, subscribe
          to our newsletter, or interact with our website. This may include your name,
          email address, and any message content you submit.
        </p>
        <h2 className="font-instrument-serif text-2xl text-graphite mt-8 mb-4">
          Cookies and Tracking
        </h2>
        <p>
          We use cookies to enhance your browsing experience and to serve personalized
          ads through Google AdSense. You can control cookie settings through your
          browser preferences.
        </p>
        <h2 className="font-instrument-serif text-2xl text-graphite mt-8 mb-4">
          Third-Party Services
        </h2>
        <p>
          We use Google AdSense to display ads. Google may use cookies to serve ads
          based on your prior visits to our website or other websites. You may opt out
          of personalized advertising by visiting{' '}
          <a
            href="https://www.google.com/settings/ads"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>.
        </p>
      </div>
    </main>
  );
}
