"use client"

import MainContent from "@/components/MainContent";
import { PenIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <MainContent />
      <div className="relative">

        <div onClick={() => setIsOpen(prev => !prev)} className={`fixed bottom-20 right-5 z-50 bg-indigo-600 text-white flex items-center  cursor-pointer hover:bg-indigo-700 transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "rounded-xl py-4 px-7 gap-2" : "rounded-full py-3 px-3 "}`}>
          <PenIcon
            className="flex-shrink-0 transition-transform duration-300 hover:scale-110"
          />
          <Link
            href="/user/submit-notes"
            className={`whitespace-nowrap transition-all duration-500 ease-in-out ${isOpen
              ? "opacity-100 max-w-xs translate-x-0"
              : "opacity-0 max-w-0 -translate-x-4"
              }`}
          >
            Submit your own notes
          </Link>
        </div>
      </div>
    </>
  );
}