'use client'

import { useTranslations } from "next-intl";


export default function NotFoundData() {
  const t = useTranslations()
  return (
    <div className="flex justify-start">
        <div className="text-2xl underline font-semibold text-black dark:text-white">{t('NotFound')}</div>
    </div>
  );
}
