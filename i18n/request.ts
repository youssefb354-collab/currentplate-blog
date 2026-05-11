import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const isValidLocale = hasLocale(routing.locales, locale);

  return {
    locale: isValidLocale ? locale : routing.defaultLocale,
    messages: (await import(`../messages/${isValidLocale ? locale : routing.defaultLocale}.json`)).default,
  };
});
