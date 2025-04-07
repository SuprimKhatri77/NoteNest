import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


interface SubjectCardProps {
  icon: IconDefinition;
  title: string;
  description: string;
  noteCount: string;
}

function SubjectCard({ icon, title, description, noteCount }: SubjectCardProps)  {
  return (
    <div className="bg-white rounded-xl p-8 shadow transition-all border border-transparent hover:translate-y-[-10px] hover:shadow-lg hover:border-gray-200 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-[5px] before:bg-indigo-600 before:scale-x-0 before:origin-right before:transition-transform hover:before:scale-x-100 hover:before:origin-left dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-500 group">
      
      <div className="w-[60px] h-[60px] bg-indigo-400 text-white flex justify-center items-center rounded-xl mb-5 text-2xl transition-all group-hover:bg-indigo-600 group-hover:rotate-360">
        <FontAwesomeIcon icon={icon} className="transition-transform duration-300" />
      </div>

      <h3 className="mb-4 font-semibold text-xl">{title}</h3>
      <p className="text-gray-700 text-sm mb-5 leading-relaxed dark:text-gray-300">{description}</p>
      <span className="block text-indigo-600 font-semibold text-base mb-4">{noteCount}</span>
      <a href="#" className="text-indigo-600 inline-flex items-center font-medium text-base py-1 relative hover:after:scale-x-100 hover:after:origin-left after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-indigo-600 after:scale-x-0 after:origin-right after:transition-transform transition-all hover:translate-x-1">
        Explore
        <FontAwesomeIcon icon={faArrowRight} className="ml-2 " />
      </a>
    </div>
  )
}

export default SubjectCard;
