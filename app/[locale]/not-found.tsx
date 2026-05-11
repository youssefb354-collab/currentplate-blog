import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('nav');

  return (
    <main className="flex-1 flex flex-col items-center justify-center py-32 px-4">
      <h1 className="font-instrument-serif text-8xl text-primary mb-4">404</h1>
      <h2 className="font-instrument-serif text-3xl text-graphite mb-6">
        Page Not Found
      </h2>
      <p className="text-graphite/60 mb-8 text-center max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved or doesn't exist.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 smooth-transition"
      >
        {t('home')}
      </Link>
    </main>
  );
}
