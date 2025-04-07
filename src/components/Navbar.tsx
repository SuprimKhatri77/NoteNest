"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faMagnifyingGlass,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModeToggle from "./ModeToggle";
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
    const [isActive, setIsActive] = useState(false);
    const pathName = usePathname();

    function checkActiveLink(href: string) {
        if (pathName === href)
            return `font-medium text-indigo-600
                    relative before:content-[''] before:absolute before:h-1 md:before:w-full  before:bg-indigo-700 before:-bottom-2 before:rounded-xl`;
        else return `dark:text-gray-200`
    }
    return (
        <header className="sticky bg-white dark:bg-black top-0 shadow-md md:h-18 md:flex md:flex-col md:justify-center min-w-screen z-50 ">
            <nav className="hidden justify-between items-center py-2 px-7 md:flex z-20">
                <Link href="/" className="text-3xl text-indigo-600 font-extrabold">
                    NoteNest
                </Link>
                <div className="flex gap-5">
                    <Link href="/" className={`${checkActiveLink("/")}  dark:text-gray-200`}>
                        Home
                    </Link>
                    <Link href="/subjects" className={`${checkActiveLink("/subjects")}  dark:text-gray-200`}>
                        Subjects
                    </Link>
                    <Link
                        href="/past-papers"
                        className={`${checkActiveLink("/past-papers")}  dark:text-gray-200`}
                    >
                        Past Papers
                    </Link>
                    <Link
                        href="/resources"
                        className={`${checkActiveLink("/resources")}  dark:text-gray-200`}
                    >
                        Resources
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
                    <SignedOut>
                        <SignUpButton mode="modal">
                    <button className="py-2 px-5 border-2 border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-400 hover:text-white hover:translate-y-[-2px] transition-all hover:shadow text-center !cursor-pointer dark:text-white">
                        Sign up
                    </button>
                        </SignUpButton>
                    <SignInButton mode="modal">
                        <button className="py-2 px-5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 hover:translate-y-[-2px] transition-all hover:shadow text-center !cursor-pointer">
                            Login
                        </button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
                <div>
                    <ModeToggle />
                </div>
            </nav>

            {/* mobile nav */}
            <div>
                <nav className="md:hidden flex justify-between items-center  py-2 px-1">
                    <Link href="/" className="text-xl font-bold text-indigo-600">
                        NoteNest
                    </Link>
                    <div className="flex gap-2 items-center">
                        <div className="flex gap-3 items-center">
                            <div className="flex items-center w-full max-w-[180px] rounded-md overflow-hidden border border-gray-300 dark:border-gray-500 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-300 dark:focus-within:ring-indigo-600 transition">
                                <input
                                    type="text"
                                    className="w-full px-2 py-1 text-sm bg-white dark:bg-zinc-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                                    placeholder="Search..."
                                />
                                <button className="bg-indigo-600 px-2 py-1 text-white hover:bg-indigo-700 transition">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <ModeToggle />

                        <FontAwesomeIcon
                            icon={faBars}
                            className="w-7 h-7"
                            onClick={() => setIsActive(true)}
                        />
                    </div>
                </nav>
            </div>
            <div
                className={`absolute flex flex-col  gap-5 right-0 bg-white text-black shadow-2xl pl-2 py-5 w-2/4 h-screen top-0
                    transition duration-300 ease-in-out md:hidden dark:bg-gray-800
                    ${isActive ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                    className="mr-auto text-2xl dark:text-gray-200"
                    onClick={() => setIsActive(false)}
                />
                <Link href="/" className={`${checkActiveLink("/")}`}>
                    Home
                </Link>
                <Link href="/subjects" className={`${checkActiveLink("/subjects")}`}>
                    Subjects
                </Link>
                <Link
                    href="/past-papers"
                    className={`${checkActiveLink("/past-papers")}`}
                >
                    Past Papers
                </Link>
                <Link href="/resources" className={`${checkActiveLink("/resources")}`}>
                    Resources
                </Link>
                <Link href="/about" className={`${checkActiveLink("/about")}`}>
                    About
                </Link>
            </div>
        </header>
    );
}
