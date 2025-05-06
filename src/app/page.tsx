'use client'
import { useSearch } from "@/context/SearchProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

export default function Home() {
      const { search } = useSearch();
      useEffect(()=>{
        console.log('search',search);
      
      },[search])
  return (
    <div className="h-screen cover-gradient-black">
      <div className="flex flex-col justify-center lg:pb-12 h-[55vh] lg:h-[70vh]">
        <div className="absolute top-0 left-0 z-[-5] h-[95vh] w-screen">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
          >
            <Image src={`${process.env.NEXT_PUBLIC_S3}/cover_test.webp`} layout="fill" className="select-none" objectFit="cover"  objectPosition="center" alt="test" priority/>
          </motion.div>
        </div>

          <div className="px-6">
              <div>
                <motion.div
                  initial={{ filter: "brightness(0%)" }}
                  animate={{ filter: "brightness(100%)" }}
                  transition={{ duration: 0.5 }}
                >
                    <Image src={`${process.env.NEXT_PUBLIC_S3}/netflix_series.webp`} width={140} height={140} className="select-none" alt="netflix_series" loading="lazy"/>
                </motion.div>
              </div>
              <div className="mt-5">
                <Image src={`${process.env.NEXT_PUBLIC_S3}/logo_test.webp`} width={450} height={450} className="select-none w-auto max-h-[150px]" alt="logo_test" priority/>
              </div>
            
              <div className="flex gap-2 text-xl mt-5 font-semibold">
                <Image src={`${process.env.NEXT_PUBLIC_S3}/top10.webp`} width={30} height={30} className="select-none" alt="top10" loading="lazy"/>
                <span className="my-auto">#1 in TV Shows Today</span>
              </div>

              <div className="max-w-[450px] line-clamp-3 mt-5 ">
                <span className="text-lg">
                  Determined to protect a young patient who escaped a mysterious
                  cult, a psychiatrist takes the girl in, putting her own family — and
                  life — in danger.sdfdsfsdfsfsdfsdf
                </span>
              </div>

              <div className="mt-5 flex gap-4">
                <button onClick={()=>console.log('play')}  className="bg-white text-black button-cover">
                  <FaPlay className="my-auto" /> Play
                </button>
                <button onClick={()=>console.log('info')} className="bg-[#515451] text-white button-cover">
                  <FaCircleInfo className="my-auto" /> More Info
                </button>
              </div>
          </div>

      </div>
    </div>
  );
}
