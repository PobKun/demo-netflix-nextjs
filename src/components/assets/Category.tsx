'use client'
import Image from 'next/image';
import { Swiper ,SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useLocale, useTranslations } from 'next-intl';
import { ApiResponse_MediaCategorized, CategoriesType, MediaItemType } from '@/types/Assets';
import { useQuery } from '@tanstack/react-query';
import { FetchMovieSearch } from '@/utils/Fetch';
import { useSearch } from '@/providers/SearchProvider';
import { Dispatch, SetStateAction, useEffect } from 'react';
import NotFoundData from './NotFoundData';
import { useCoverBox } from '@/providers/CoverBoxProvider';
export default function Category({data,theme,setLoadImg}:{data:ApiResponse_MediaCategorized,theme:string,setLoadImg:Dispatch<SetStateAction<boolean>>}) {
  const t = useTranslations()
  const { search } = useSearch();
  const locale = useLocale()
  const {coverBoxData,setCoverBoxData} = useCoverBox()
  
  const {isLoading:isLoadingSearch,data:dataSearch,refetch} = useQuery({
      queryKey: ['FetchMovieSearch',search],
      queryFn: () => FetchMovieSearch(locale,search),
      enabled: false
  })

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search !== '') {
        refetch();
      }
    }, 300);
  
    return () => {
      clearTimeout(handler);
    };
  }, [search,locale,refetch]);


  const handleCoverBox = (v:MediaItemType) => {
    if(coverBoxData && coverBoxData.id !== v.id) { setLoadImg(true) }
    setCoverBoxData(v);
  }

  return (
    <>

      {(!isLoadingSearch && dataSearch) ?
        <>
           <div className="mt-5 lg:mt-8 px-6">
              <div>
                <h2 className={`text-2xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}>{t('Menu.Search')}</h2>
              </div>
              <div className="mt-5">
                {(dataSearch.success && dataSearch.data.length >= 1) ?
                  <Swiper
                  spaceBetween={20}
                  slidesPerView={'auto'}
                  freeMode={true}
                  >
                    {dataSearch.data.map((v, i) => (
                      <SwiperSlide key={i} className='!w-[220px] sm:!w-[380px]'>
                          <Image onClick={()=>handleCoverBox(v)} src={`${v.image}`} width={390} height={219} className="select-none w-[220px] sm:w-[380px] max-h-[213.93px] rounded cursor-pointer" alt={v.title} loading="lazy"/>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                :
                  <NotFoundData />
                }
              </div>
          </div>
        </>
      :
      <>
        {Object.entries(data.data).map(([categoryName, items]) => (
          <div key={categoryName} className="mt-5 lg:mt-8 px-6">
              <div>
                <h2 className={`text-2xl font-bold ${(categoryName === 'Popular' && theme === 'light') ? 'text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]': 'text-black dark:text-white'}`}>{(categoryName === 'Popular') ? t('Popular') : t(`Categories.${categoryName as CategoriesType}`)}</h2>
              </div>
              <div className="mt-5">
                  <Swiper
                  spaceBetween={20}
                  slidesPerView={'auto'}
                  freeMode={true}
                  >
                    {items.map((v, i) => (
                      <SwiperSlide key={i} className='!w-[220px] sm:!w-[380px]'>
                          <Image onClick={()=>handleCoverBox(v)} src={`${v.image}`} width={390} height={219} className="select-none w-[220px] sm:w-[380px] max-h-[213.93px] rounded cursor-pointer" alt={v.title} loading="lazy"/>
                      </SwiperSlide>
                    ))}
                  </Swiper>
              </div>
          </div>
        ))}
      </>
      }
    </>
  );
}
