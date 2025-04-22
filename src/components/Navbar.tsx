"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faMagnifyingGlass,
    faXmark,
    faHome,
    faNoteSticky,
    faBook,
    faFolderOpen,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ModeToggle from "./ModeToggle";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Navbar() {
    const [isActive, setIsActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathName = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close sidebar on path change
    useEffect(() => {
        setIsActive(false);
    }, [pathName]);

    // Handle body scroll lock when sidebar is open
    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isActive]);

    function checkActiveLink(href: string) {
        if (pathName === href)
            return `font-medium text-indigo-600 dark:text-indigo-600
                    relative before:content-[''] before:absolute before:h-1 md:before:w-full before:bg-indigo-700 before:-bottom-2 before:rounded-xl`;
        else return `dark:text-gray-200`
    }

    return (
        <header className={`sticky bg-white dark:bg-black top-0 shadow-md md:h-18 md:flex md:flex-col md:justify-center min-w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
            <nav className="hidden max-w-[1400px] mx-auto w-full justify-between items-center py-2 px-2 xl:px-7 lg:flex z-20">
                <Link href="/" className="text-3xl text-indigo-600 font-extrabold">
                    NoteNest
                </Link>
                <div className="flex gap-5">
                    <Link href="/" className={`${checkActiveLink("/")}  dark:text-gray-200`}>
                        Home
                    </Link>
                    <Link href="/notes" className={`${checkActiveLink("/notes")}  dark:text-gray-200`}>
                        Notes
                    </Link>
                    <Link
                        href="/past-papers"
                        className={`${checkActiveLink("/past-papers")}  dark:text-gray-200`}
                    >
                        Past Papers
                    </Link>
                    <Link href="/about" className={`${checkActiveLink("/about")}dark:text-gray-200`}>
                        About
                    </Link>
                </div>
                <div className="flex gap-4">
                    <div className="flex w-full max-w-xs rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-300 dark:focus-within:ring-indigo-600 transition">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full px-3 py-1.5 text-sm bg-white dark:bg-zinc-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                        />
                        <button className="bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-700 transition cursor-pointer">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />
                        </button>
                    </div>

                    <ClerkLoading>
                        <div
                            className="inline-block border-indigo-600 h-8 w-8 animate-spin rounded-full border-4 border-solid  border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] 
                         dark:text-white"
                            role="status">
                            <span
                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                            >Loading...</span
                            >

                        </div>
                    </ClerkLoading>
                    <ClerkLoaded>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <Link href="/sign-up" className="py-2 px-5 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-400 hover:text-white hover:translate-y-[-2px] transition-all hover:shadow text-center !cursor-pointer dark:text-white">
                                Sign up
                            </Link>
                            <Link href="/sign-in" className="py-2 px-5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 hover:translate-y-[-2px] transition-all hover:shadow text-center !cursor-pointer">
                                Login
                            </Link>
                        </SignedOut>
                    </ClerkLoaded>
                </div>
                <div>
                    <ModeToggle />
                </div>
            </nav>

            {/* mobile nav */}
            <div>
                <nav className={`lg:hidden flex justify-between items-center py-3 px-2 transition-all duration-300 ${isScrolled ? 'py-2' : ''}`}>
                    <Link href="/" className="text-xl font-bold text-indigo-600 flex items-center gap-1 transition-transform hover:scale-105">
                        {/* <span className="bg-indigo-600 text-white rounded p-1 hidden sm:inline">
                            <FontAwesomeIcon icon={faBook} className="w-3 h-3" />
                        </span> */}
                        NoteNest
                    </Link>
                    <div className="flex gap-1 items-center ml-1">
                        <div className="flex items-center w-full max-w-[180px] rounded-md overflow-hidden border border-gray-300 dark:border-gray-500 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-300 dark:focus-within:ring-indigo-600 transition-all duration-200">
                            <input
                                type="text"
                                className="w-full px-2 py-1.5 text-sm bg-white dark:bg-zinc-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                                placeholder="Search..."
                            />
                            <button className="bg-indigo-600 px-2 py-1.5 text-white hover:bg-indigo-700 transition-colors duration-200">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />
                            </button>
                        </div>

                        <ModeToggle />

                        <button
                            onClick={() => setIsActive(true)}
                            aria-label="Open menu"
                            className="relative p-2 text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
                        >
                            <FontAwesomeIcon
                                icon={faBars}
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                </nav>
            </div>

            {/* sidebar */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsActive(false)}
            ></div>

            <div
                className={`fixed flex flex-col gap-6 right-0 bg-white dark:bg-gray-900 shadow-2xl px-5 py-6 w-3/4 max-w-xs h-screen top-0
                    transition-all duration-300 ease-in-out lg:hidden z-50 rounded-l-xl
                    ${isActive ? "translate-x-0" : "translate-x-full"}
                    ${isActive ? "opacity-100" : "opacity-0"}`}
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Menu</h3>
                    <button
                        onClick={() => setIsActive(false)}
                        aria-label="Close menu"
                        className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="w-5 h-5"
                        />
                    </button>
                </div>

                <div className="mt-2">
                    <SignedIn>
                        <div className="flex items-center gap-3 mb-6 p-3 bg-indigo-50 dark:bg-gray-800 rounded-lg">
                            <UserButton />
                            <div>
                                <p className="text-sm font-medium dark:text-gray-200">Welcome back!</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Manage your account</p>
                            </div>
                        </div>
                    </SignedIn>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                    <Link
                        href="/"
                        className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800 ${pathName === "/" ? "bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium" : "text-gray-700 dark:text-gray-300"}`}
                    >
                        <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                        <span>Home</span>
                    </Link>

                    <Link
                        href="/notes"
                        className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800 ${pathName === "/notes" ? "bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium" : "text-gray-700 dark:text-gray-300"}`}
                    >
                        <FontAwesomeIcon icon={faNoteSticky} className="w-5 h-5" />
                        <span>Notes</span>
                    </Link>

                    <Link
                        href="/past-papers"
                        className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800 ${pathName === "/past-papers" ? "bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium" : "text-gray-700 dark:text-gray-300"}`}
                    >
                        <FontAwesomeIcon icon={faBook} className="w-5 h-5" />
                        <span>Past Papers</span>
                    </Link>

                    <Link
                        href="/about"
                        className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-gray-800 ${pathName === "/about" ? "bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium" : "text-gray-700 dark:text-gray-300"}`}
                    >
                        <FontAwesomeIcon icon={faCircleInfo} className="w-5 h-5" />
                        <span>About</span>
                    </Link>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                    <SignedOut>
                        <div className="flex flex-col gap-3">
                            <SignUpButton mode="modal">
                                <button className="w-full py-2.5 px-4 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-all duration-200 text-center !cursor-pointer dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-800">
                                    Sign up
                                </button>
                            </SignUpButton>
                            <SignInButton mode="modal">
                                <button className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-200 text-center !cursor-pointer">
                                    Login
                                </button>
                            </SignInButton>
                        </div>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
}