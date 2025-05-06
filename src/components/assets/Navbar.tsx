'use client'
import { useSearch } from "@/context/SearchProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBell, FaChromecast, FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
export default function Navbar() {
    const { setTheme } = useTheme()
    const { search,setSearch } = useSearch();

    const [dropdowns, setDropdowns] = useState({
        profile: false,
        search: false,
        categories: false,
    });
    
    const toggleDropdown = (key: keyof typeof dropdowns) => {
        setDropdowns((prev) => {
          const newState = {
            ...prev, 
          };
          for (const dropdown in newState) {
            if (dropdown === key) {
              newState[dropdown as keyof typeof dropdowns] = !newState[dropdown as keyof typeof dropdowns];
            } else {
              newState[dropdown as keyof typeof dropdowns] = false;
            }
          }
          return newState;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (!target.closest('[data-dropdown]')) {
            setDropdowns({
              profile: false,
              search: false,
              categories: false,
            });
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <header className="relative z-[990] navbar-gradient-black ">
       <nav>
        <div className="flex justify-between py-2 px-4">
            <div className="flex gap-4 lg:gap-6  my-auto">
                <Link href="/">
                    <Image sizes="cover" alt="logo-netflix" src={`${process.env.NEXT_PUBLIC_S3}/netflix_logo.webp`} width={120} height={120}  className="hidden md:block w-[120px] h-auto  my-auto" priority/>
                    <Image sizes="cover" alt="logo-netflix-symbol" src={`${process.env.NEXT_PUBLIC_S3}/netflix_symbol.webp`} width={40} height={40}  className="block md:hidden w-[40px] h-auto  my-auto" priority/>

                </Link>
                <div className="hidden sm:flex gap-3 lg:gap-4 my-auto ">
                    <div className="nav-link-header active">
                        <Link href="/">Home</Link>
                    </div>
                    <div className="nav-link-header">
                        <Link href="/">TV Shows</Link>
                    </div>
                    <div className="nav-link-header">
                        <Link href="/">Movies</Link>
                    </div>
                    <div className="nav-link-header">
                        <Link href="/">New & Popular</Link>
                    </div>
                    <div className="nav-link-header">
                        <Link href="/">Browse by Languages</Link>
                    </div>
                </div>
            </div>
            <div className="flex max-sm:gap-4 sm:gap-3 lg:gap-4 item-center">
                <div className="nav-link-header">
                    <div className="relative" data-dropdown>
                        <div className="flex gap-1 cursor-pointer " onClick={() => toggleDropdown("search")}>
                            <div className="my-auto">
                                <FaSearch className="max-sm:text-xl"/>
                            </div>
                        </div>   
                  
                        <AnimatePresence>
                        {dropdowns.search && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute max-sm:left-1/2 max-sm:-translate-x-1/2 right-[-5px] top-[105%] mt-2 w-48 bg-[#2e2e2e] shadow-md rounded-md py-2 z-50"
                        >
                            <div className="px-4 py-2 font-semibold">Search</div>
                            <div className="px-4 py-2">
                                <input type="text" onChange={(e)=>setSearch(e.target.value ?? '')} value={search} className="px-2 py-2 font-light text-white bg-white/10 rounded-md w-full border" />
                            </div>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                </div>
                <div className="nav-link-header hidden md:block">
                    <span>Kids</span>
                </div>
                <div className="nav-link-header">
                    <Link href="/"><FaBell className="max-sm:text-xl"/></Link>
                </div>
                <div className="nav-link-header block sm:hidden">
                    <Link href="/"><FaChromecast className="max-sm:text-xl"/></Link>
                </div>
                
                <div className="nav-link-header">
                    <div className="relative" data-dropdown>
                        <div className="flex gap-1 cursor-pointer" onClick={() => toggleDropdown("profile")}>
                            <div className="bg-[#D9D9D9] rounded-sm w-[30px] h-[30px]"></div>
                            <div className="my-auto">
                            <FaCaretDown />
                            </div>
                        </div>

                        <AnimatePresence>
                        {dropdowns.profile && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-[-5px] top-[105%] mt-2 w-48 bg-[#2e2e2e] shadow-md rounded-md py-2 z-50"
                        >
                            <div className="px-4 py-2 font-semibold">Choose language</div>
                            
                            <button className="nav-link-dropdown">
                                Thai (ไทย)
                            </button>
                            <button className="nav-link-dropdown">
                                Enaglish
                            </button>
                            <div className="my-2">
                                <hr />
                            </div>

                            <div className="px-4 py-2 font-semibold">Theme</div>
                            <button onClick={() => setTheme('light')} className="nav-link-dropdown flex gap-1">
                                Light Mode <FaSun className="my-auto" />
                            </button>
                            <button onClick={() => setTheme('dark')} className="nav-link-dropdown  flex gap-1">
                                Dark Mode <FaMoon className="my-auto" />
                            </button>
                            <div className="my-2">
                                <hr />
                            </div>

                            <Link href="/" className="nav-link-dropdown text-red-500">
                                Logout
                            </Link>
                            
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>

                  
                </div>
            </div>
        </div>

        <div className="flex sm:hidden justify-between gap-4 py-2 px-4 max-w-[340px] mx-auto">
            <div className="nav-link-header text-base">
                <Link href="/">TV Shows</Link>
            </div>
            <div className="nav-link-header text-base">
                <Link href="/">Movies</Link>
            </div>
            <div className="nav-link-header  text-base">
                    <div className="relative" data-dropdown>
                        <div className="flex gap-1 cursor-pointer " onClick={() => toggleDropdown("categories")}>
                            <span>Categories</span>
                            <div className="my-auto">
                            <FaCaretDown />
                            </div>
                        </div>

                        <AnimatePresence>
                        {dropdowns.categories && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-[-5px] top-[105%] mt-2 w-48 bg-[#2e2e2e] shadow-md rounded-md py-2 z-50"
                        >
                            
                            <Link href={'/'} className="nav-link-dropdown">
                                New & Popular
                            </Link>
                            <Link href={'/'} className="nav-link-dropdown">
                                Browse by Languages
                            </Link>
                          
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>

                  
                </div>
        </div>
      </nav>
    </header>
   
  );
}




