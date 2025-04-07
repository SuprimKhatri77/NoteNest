import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function FeatureCard({ icon, title, description } : {icon:any, title:string, description:string}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow transition-all border border-transparent hover:translate-y-[-10px] hover:shadow-lg hover:border-gray-200 text-center dark:bg-gray-800 group">
      <div className="w-[70px] h-[70px] bg-indigo-400 text-white flex justify-center items-center rounded-full mx-auto mb-6 text-2xl transition-all group-hover:bg-indigo-600 group-hover:rotate-y-180 ">
        <FontAwesomeIcon icon={icon} />
      </div>
      <h3 className="mb-4 font-semibold text-xl text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-gray-700 text-base leading-relaxed dark:text-gray-300">{description}</p>
    </div>
  )
}

export default FeatureCard