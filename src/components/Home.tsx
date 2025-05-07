'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { useTheme } from "next-themes";
import Category from "@/components/assets/Category";
import { useLocale, useTranslations } from "next-intl";
import { CategoriesType } from "@/types/Assets";
import { useQuery } from "@tanstack/react-query";
import { FetchMovieCategorized } from "@/utils/Fetch";
import LoadingOverlay from "./assets/LoadingOverlay";
import NotFoundData from "./assets/NotFoundData";

export default function Home() {
  const { theme } = useTheme()
  const t = useTranslations()
  const locale = useLocale()
  const [imageSize, setSmageSize] = useState({
    width: 1,
    height: 1
   });
  const [hookTheme , setHookTheme] = useState<string | undefined>("dark")

  const {isLoading,data} = useQuery({
    queryKey: ['FetchMovieCategorized'],
    queryFn: () => FetchMovieCategorized(locale)
  })

  useEffect(()=>{
    setHookTheme(theme)
  },[theme])


  const test_category:string = 'TvShow'

  return (
    <div suppressHydrationWarning className={`min-h-screen ${hookTheme === 'light' ? 'cover-gradient-white' : 'cover-gradient-black'}`}>

        {isLoading && 
          <LoadingOverlay />
        }

        <div className="flex flex-col justify-end sm:justify-center lg:pb-12 h-[55vh] lg:h-[70vh]">
    
          <div className="absolute top-0 left-0 z-[-5] h-[95vh] w-screen">
                <Image src={`${process.env.NEXT_PUBLIC_S3}/cover_test.webp`} fill className="select-none object-cover object-center" alt="test" priority/>
          </div>

            <div className="px-6">
                <div>
                  <motion.div
                    initial={{ filter: "brightness(0%)" }}
                    animate={{ filter: "brightness(100%)" }}
                    transition={{ duration: 0.5 }}
                  >
                      <Image src={`${process.env.NEXT_PUBLIC_S3}/netflix_series.webp`} width={257} height={64} className="select-none max-sm:mx-auto w-[120px] sm:w-[140px]" alt="netflix_series" loading="lazy"/>
                  </motion.div>
                </div>
                <div className="mt-5 relative w-full">
                  <Image sizes="cover" src={`${process.env.NEXT_PUBLIC_S3}/logo_test.webp`} width={imageSize.width} height={imageSize.height} className="select-none w-[400px] max-sm:mx-auto sm:w-[450px] max-h-[150px]" alt="logo_test" onLoad={target => {
                        setSmageSize({
                        width: target.currentTarget.naturalWidth,
                        height: target.currentTarget.naturalHeight
                        });
                    }} priority/>
                </div>

              
                <div className="hidden sm:flex gap-2 text-xl mt-5 font-semibold">
                  <Image src={`${process.env.NEXT_PUBLIC_S3}/top10.webp`} width={44} height={44} className="select-none w-[30px]" alt="top10" loading="lazy"/>
                  <span className="my-auto  text-white">{t('Top10',{ranking: 1,category: t(`Categories.${test_category as CategoriesType}`) })}</span>
                </div>

                <div className="max-sm:hidden max-w-[450px] line-clamp-3 mt-5  text-white">
                  <span className="text-lg">
                    Determined to protect a young patient who escaped a mysterious
                    cult, a psychiatrist takes the girl in, putting her own family — and
                    life — in danger.sdfdsfsdfsfsdfsdf
                  </span>
                </div>

                <div className="block sm:hidden text-center mt-5">
                  <span className="text-lg text-white">{t(`Categories.${test_category as CategoriesType}`)}</span>
                </div>

                <div className="mt-5 flex justify-between max-w-[350px] max-sm:mx-auto sm:w-auto sm:justify-start gap-4">
                  <button onClick={()=>console.log('my-list')} className="sm:hidden text-white cursor-pointer">
                    <FaPlus className="m-auto text-3xl" />
                    <div className="mt-1">{t('Button.MyList')}</div>
                  </button>
                  <button onClick={()=>console.log('play')}  className="bg-white text-black button-cover min-w-[130px] my-auto">
                    <FaPlay className="my-auto" /> {t('Button.Play')}
                  </button>
                  <button onClick={()=>console.log('info')} className="max-sm:hidden bg-[#515451] text-white button-cover">
                    <BsInfoCircle className="my-auto" /> {t('Button.MoreInfo')}
                  </button>
                  <button onClick={()=>console.log('info')} className="sm:hidden text-white cursor-pointer">
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


