'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPlus, FaTimes } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { useTheme } from "next-themes";
import Category from "@/components/assets/Category";
import { useLocale, useTranslations } from "next-intl";
import { CategoriesType } from "@/types/Assets";
import { useQuery } from "@tanstack/react-query";
import { FetchMovieCategorized, FetchMovieID } from "@/utils/Fetch";
import LoadingOverlay from "./assets/LoadingOverlay";
import NotFoundData from "./assets/NotFoundData";
import { useCoverBox } from "@/providers/CoverBoxProvider";

export default function Home() {
  const {coverBoxData,setCoverBoxData} = useCoverBox()
  const { theme } = useTheme()
  const t = useTranslations()
  const locale = useLocale()
  const [imageSize, setSmageSize] = useState({
    width: 1000,
    height: 1000
   });
  const [hookTheme , setHookTheme] = useState<string | undefined>("dark")
  const hasRun = useRef<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {isLoading,data,refetch} = useQuery({
    queryKey: ['FetchMovieCategorized'],
    queryFn: () => FetchMovieCategorized(locale)
  })

  const {isLoading:isLoadingMovieID,data:dataMovieID,refetch:refetchMovieID} = useQuery({
    queryKey: ['FetchMovieID'],
    queryFn: () => FetchMovieID(locale,(coverBoxData) ? coverBoxData.id : 0),
    enabled: false
  })

  useEffect(()=>{   
    console.log('[HOME]','refetch');
    refetch()
  },[locale,refetch])

  useEffect(()=>{   
    if(hasRun.current) {
      console.log('[HOME]','refetchMovieID');
      refetchMovieID();
    }
  },[locale,refetchMovieID])

  useEffect(()=>{    
    setHookTheme(theme)
  },[theme])

  useEffect(()=> {
    if(!hasRun.current && !isLoading && data && data.success && data.data.Popular.length >= 1) {
        console.log('[HOME]','setCoverBoxData');
        setCoverBoxData(data.data.Popular[0])   
        hasRun.current = true;   
    }
  },[data,isLoading,setCoverBoxData])


  useEffect(()=> {
    if(hasRun.current && !isLoadingMovieID && dataMovieID && dataMovieID.success && dataMovieID.data) {
      console.log('[HOME]','setCoverBoxData MovieID');
        setCoverBoxData(dataMovieID.data)   
    }
  },[isLoadingMovieID,dataMovieID,setCoverBoxData])

  return (
    <div suppressHydrationWarning className={`min-h-screen ${hookTheme === 'light' ? 'cover-gradient-white' : 'cover-gradient-black'}`}>


        {isLoading && 
          <LoadingOverlay />
        }

        {(isOpen && coverBoxData) && 
            <div className="fixed inset-0 z-[9900] bg-white/90 dark:bg-black/90 flex items-center justify-center">
              <div className="relative p-6 max-h-screen overflow-y-auto shadow-lg w-full h-full">
                <button
                  className="cursor-pointer absolute z-[9901] top-4 right-4 text-black dark:text-white hover:text-red-500 transition duration-300 ease-in-out"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes className="text-2xl" />
                </button>

                <div className="text-start text-black dark:text-white py-5 max-w-[800px] mx-auto">
                  <div className="mb-5">
                    <div className="video-wrapper">
                      <iframe width={560} height={315} src={coverBoxData.trailer_embed_url} loading={'lazy'} title={coverBoxData.title ?? 'Video'} allowFullScreen></iframe>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold">{t('MovieName')} : <span className="text-lg">{coverBoxData.title}</span></h2>
                  <div>
                  <span className="text-xl font-bold">{t('FullDetail')} : </span>
                  <span className="text-lg">{coverBoxData.synopsis}</span>
                  </div>

                </div>
              </div>
            </div>
        }

        <div className="flex flex-col justify-end sm:justify-center lg:pb-12 h-[55vh] lg:h-[70vh]">
    
          <div className="absolute top-0 left-0 z-[-5] h-[95vh] w-screen">
                <Image src={(coverBoxData) ? coverBoxData.image_cover : `${process.env.NEXT_PUBLIC_S3}/movie_header/placeholder.webp`} fill className="select-none object-cover object-center" alt={(coverBoxData) ? coverBoxData.title : 'placeholder'} priority/>
          
          </div>
      

            <div className="px-6">
              {(coverBoxData && coverBoxData.type === 'Series') &&
                <div>
                  <motion.div
                    initial={{ filter: "brightness(0%)" }}
                    animate={{ filter: "brightness(100%)" }}
                    transition={{ duration: 0.5 }}
                  >
                      <Image src={`${process.env.NEXT_PUBLIC_S3}/netflix_series.webp`} width={257} height={64} className="select-none max-sm:mx-auto w-[120px] sm:w-[140px]" alt="netflix_series" loading="lazy"/>
                  </motion.div>
                </div>
              }
                <div className="mt-5 relative w-full">
                  {coverBoxData &&
                  <Image src={`${coverBoxData.image_logo}`} width={imageSize.width} height={imageSize.height} className="select-none w-[400px] max-sm:mx-auto sm:w-[450px] max-h-[150px]" alt={'logo_movie'} onLoad={target => {
                        setSmageSize({
                          width: target.currentTarget.naturalWidth,
                          height: target.currentTarget.naturalHeight
                        });
                    }}/>
                  }
                </div>

              
                {(coverBoxData && coverBoxData.top10 >= 1) &&

                <div className="hidden sm:flex gap-2 text-xl mt-5 font-semibold">
                  <Image src={`${process.env.NEXT_PUBLIC_S3}/top10.webp`} width={44} height={44} className="select-none w-[30px]" alt="top10" loading="lazy"/>
                  <span className="my-auto  text-white">{t('Top10',{ranking: coverBoxData.top10,category: t(`Categories.${coverBoxData.type as CategoriesType}`) })}</span>
                  
                </div>
                  }

                <div className="max-sm:hidden max-w-[450px] line-clamp-3 mt-5  text-white">
                {coverBoxData ?
                  <span className="text-lg">
                   {coverBoxData.synopsis}
                  </span>
                 : 
                  <span className="text-lg">
                  ....
                  </span>
                 }
                </div>

                <div className="block sm:hidden text-center mt-5">
                {coverBoxData &&
                  <span className="text-lg text-white">{t(`Categories.${coverBoxData.type as CategoriesType}`)}</span>
                }
                </div>

                <div className="mt-5 flex justify-between max-w-[350px] max-sm:mx-auto sm:w-auto sm:justify-start gap-4">
                  <button onClick={()=>console.log('my-list')} className="sm:hidden text-white cursor-pointer">
                    <FaPlus className="m-auto text-3xl" />
                    <div className="mt-1">{t('Button.MyList')}</div>
                  </button>
                  <button onClick={()=>setIsOpen(true)}  className="bg-white text-black button-cover min-w-[130px] my-auto">
                    <FaPlay className="my-auto" /> {t('Button.Play')}
                  </button>
                  <button onClick={()=>setIsOpen(true)} className="max-sm:hidden bg-[#515451] text-white button-cover">
                    <BsInfoCircle className="my-auto" /> {t('Button.MoreInfo')}
                  </button>
                  <button onClick={()=>setIsOpen(true)} className="sm:hidden text-white cursor-pointer">
                    <BsInfoCircle className="m-auto text-3xl" />
                    <div className="mt-1">{t('Button.Info')}</div>
                  </button>
                </div>
            </div>
        </div>
        
        {data ?
         <Category data={data} theme={hookTheme ?? 'dark'} />
        :
          <div className="mt-5 lg:mt-8 px-6">
            <NotFoundData />
          </div>
        }
    </div>
  );
}


