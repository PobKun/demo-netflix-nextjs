import {getRequestConfig} from 'next-intl/server';
import {getUserLocale} from '@/i18n/locale';
import { Locale } from './config';

export default getRequestConfig(async () => {
  const locale = await getUserLocale() as Locale;
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});