import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

function TestimonialCard({ name, role, testimonial }: { name: string, role: string, testimonial: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow transition-all border border-transparent hover:translate-y-[-5px] hover:shadow-lg hover:border-gray-200 relative before:content-['\201C'] before:absolute before:top-5 before:right-8 before:text-[80px] before:text-indigo-400 before:opacity-20 before:font-serif before:leading-none dark:bg-gray-800 dark:before:text-gray-100 dark:before:opacity-50">
      <div className="flex items-center mb-5">
        <Image
          src="/api/placeholder/60/60"
          alt="Student"
          width={60}
          height={60}
          className="w-[60px] h-[60px] rounded-full object-cover mr-4 border-3 border-indigo-400"
        />

        <div>
          <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200 ">{name}</h4>
          <p className="text-gray-700 text-sm dark:text-gray-300">{role}</p>
        </div>
      </div>
      <p className="italic mb-5 text-gray-700 text-base leading-relaxed relative z-10 dark:text-gray-300">{testimonial}</p>
      <div className="text-amber-500 text-base">
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
      </div>
    </div>
  )
}

export default TestimonialCard