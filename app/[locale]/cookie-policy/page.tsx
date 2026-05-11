import { useTranslations } from 'next-intl';

export default function CookiePolicy() {
  const t = useTranslations('ads');

  return (
    <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-instrument-serif text-5xl text-graphite mb-8">
        {t('cookiePolicy')}
      </h1>
      <div className="space-y-6 text-graphite/80 leading-[1.5]">
        <p>
          This Cookie Policy explains how currentplate uses cookies and similar
          technologies to recognize you when you visit our website.
        </p>
        <h2 className="font-instrument-serif text-2xl text-graphite mt-8 mb-4">
          What Are Cookies
        </h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile
          device when you visit a website. They are widely used to make websites work
          more efficiently and to provide information to website owners.
        </p>
        <h2 className="font-instrument-serif text-2xl text-graphite mt-8 mb-4">
          How We Use Cookies
        </h2>
        <p>
          We use cookies to: understand and save your preferences for future visits,
          compile aggregate data about site traffic and site interactions, and serve
          personalized advertisements through Google AdSense.
        </p>
        <h2 className="font-instrument-serif text-2xl text-graphite mt-8 mb-4">
          Managing Cookies
        </h2>
        <p>
          You can set your browser to refuse all or some browser cookies, or to alert
          you when websites set or access cookies. If you disable or refuse cookies,
          please note that some parts of this website may become inaccessible or not
          function properly.
        </p>
      </div>
    </main>
  );
}
