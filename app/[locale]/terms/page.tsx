import { useTranslations } from 'next-intl';

export default function TermsOfService() {
  const t = useTranslations('ads');

  return (
    <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-instrument-serif text-5xl text-graphite mb-8">
        {t('termsOfService')}
      </h1>
      <div className="space-y-6 text-graphite/80 leading-[1.5]">
        <p>
          These Terms of Service govern your use of currentplate and its content.
          By accessing or using our website, you agree to be bound by these terms.
        </p>
        <h2 className="font-instrument-serif text-2xl text-graphite mt-8 mb-4">
          Intellectual Property
        </h2>
        <p>
          All content on this website, including recipes, text, images, and design,
          is the property of currentplate and is protected by copyright and trademark
          laws. You may not reproduce, distribute, or create derivative works without
          our express written permission.
        </p>
        <h2 className="font-instrument-serif text-2xl text-graphite mt-8 mb-4">
          User Conduct
        </h2>
        <p>
          You agree not to use the website in any way that causes, or may cause,
          damage to the website or impairment of the availability or accessibility of
          the website, or in any way that is unlawful, illegal, fraudulent, or harmful.
        </p>
        <h2 className="font-instrument-serif text-2xl text-graphite mt-8 mb-4">
          Disclaimer
        </h2>
        <p>
          The information on this website is provided on an "as is" basis. We make
          no warranties, expressed or implied, and hereby disclaim and negate all
          other warranties including, without limitation, implied warranties or
          conditions of merchantability, fitness for a particular purpose, or
          non-infringement of intellectual property.
        </p>
      </div>
    </main>
  );
}
