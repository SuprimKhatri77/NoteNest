"use client"
import { useState } from 'react';
import Link from 'next/link';




type Chapter = {
    id: string
    title: string
    description: string
    chapterNumber: string
}

export default function ChaptersPage(
    { chapters, className, subjectName }: { chapters: Chapter[], className: string, subjectName: string }) {




    return (
        <div className="py-8 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <h1 className="text-3xl font-bold dark:text-indigo-300 text-indigo-600 capitalize">
                    {subjectName} - {className}
                </h1>
                <div className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                    <Link href={`/admin/${subjectName}`}>
                        <span className="text-indigo-600 dark:text-indigo-400 hover:underline">← Back to Classes</span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.map((chapter) => (
                    <Link href={`/admin/${subjectName}/${className}/chapter-${chapter.chapterNumber}`}
                        key={chapter.id}
                        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl `}

                    >
                        <div className="bg-indigo-500 dark:bg-indigo-700 px-4 py-3 flex items-center">
                            <span className="bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-bold">
                                {chapter.chapterNumber}
                            </span>
                            <h2 className="text-lg font-semibold text-white flex-grow">{chapter.title}</h2>
                        </div>

                        <div className="flex justify-between items-center py-4 px-4 group">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Click to view topics</p>
                            <span className="text-indigo-500 dark:text-indigo-400 group-hover:translate-x-2 transition-all duration-200 ease-in-out">→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}