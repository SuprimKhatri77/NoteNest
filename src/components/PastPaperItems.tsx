import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf, faDownload,faStar
} from "@fortawesome/free-solid-svg-icons";

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


interface PastPaperItemProps {
  rating: string;
  title: string;
  downloads: string;
}


function PaperItem({ title, downloads, rating }: PastPaperItemProps) {
  return (
    <div className="flex items-center p-5 border border-gray-200 rounded-xl transition-all bg-gray-50 hover:border-indigo-300 hover:shadow hover:translate-x-1 md:flex-row flex-col text-center md:text-left dark:bg-gray-700 dark:border-gray-600 group">

    <div className="w-[50px] h-[50px] bg-red-100 text-red-500 flex justify-center items-center rounded-xl mr-5 mb-4 md:mb-0 text-xl transition-all group-hover:bg-red-500 group-hover:text-white">
      <FontAwesomeIcon icon={faFilePdf} />
    </div>
    <div className="flex-1 mb-4 md:mb-0">
      <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">{title}</h3>
      <div className="flex gap-5 text-sm text-gray-700 md:flex-row flex-col dark:text-gray-200">
        <span className="flex items-center justify-center md:justify-start">
          <FontAwesomeIcon icon={faDownload} className="mr-1 text-indigo-600" /> {downloads}
        </span>
        <span className="flex items-center justify-center md:justify-start">
          <FontAwesomeIcon icon={faStar} className="mr-1 text-indigo-600" /> {rating}
        </span>
      </div>
    </div>
    <a href="#" className="py-2 px-5 border-2 border-indigo-600 text-indigo-600 rounded-lg text-sm hover:bg-indigo-400 hover:text-white transition-all dark:text-gray-300 dark:hover:text-gray-200">Download</a>
  </div>
  )
}

export default PaperItem