'use client'
import Image from 'next/image';
import { Swiper ,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTranslations } from 'next-intl';
export default function Category() {
  const t = useTranslations()
  return (
    <>
        <div className="mt-5 lg:mt-8 px-6">
            <div>
              <h2 className="text-2xl font-bold text-black dark:text-white">{t('Popular')}</h2>
            </div>
            <div className="mt-5">
                <Swiper
                 spaceBetween={20}
                 slidesPerView={'auto'}
                 freeMode={true}
                >
                   {[...Array(9)].map((v, i) => (
                    <SwiperSlide key={i} className='!w-[220px] sm:!w-[380px]'>
                        <Image onClick={()=>console.log('click',i)} src={`${process.env.NEXT_PUBLIC_S3}/movie_image/m${i}.webp`} width={390} height={219} className="select-none w-[220px] sm:w-[380px] max-h-[213.93px] rounded cursor-pointer" alt="logo_m0" loading="lazy"/>
                    </SwiperSlide>
                  ))}
                </Swiper>
            </div>
        </div>

    </>
  );
}
