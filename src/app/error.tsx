
'use client'
import { useEffect } from 'react'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (

        <div className="h-screen flex flex-col items-center justify-center text-center font-sans bg-white text-black dark:bg-black dark:text-white">
            <div className="flex items-center">
                <h1 className="text-2xl font-medium pr-6 border-r border-black dark:border-white">
                    500
                </h1>
               <div className='flex gap-4'>
               <h2 className="text-base font-normal pl-6">This page error.</h2>
                <div>
                    <button className='underline cursor-pointer' onClick={() => reset()}>
                        Try again.
                    </button>
                </div>
               </div>
            </div>
        </div>
  )
}