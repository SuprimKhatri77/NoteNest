"use client"
import { useState } from 'react';
import Link from 'next/link';



type Chapter = {
    id: number
    number: string
    title: string
    topics: string[]
}

export default function ChaptersPage({ subject = "Physics", classNumber = "11" }) {
    const [activeChapter, setActiveChapter] = useState(null);

    // Example chapters data
    const chapters: Chapter[] = [
        {
            id: 1,
            number: "1",
            title: "Physical World",
            topics: ["Nature of Physical Laws", "Physics and Society", "Technology and Applications"]
        },
        {
            id: 2,
            number: "2",
            title: "Units and Measurements",
            topics: ["Measurement Systems", "Error Analysis", "Significant Figures", "Dimensional Analysis"]
        },
        {
            id: 3,
            number: "3",
            title: "Motion in a Straight Line",
            topics: ["Position and Displacement", "Average and Instantaneous Velocity", "Acceleration", "Kinematic Equations"]
        },
        {
            id: 4,
            number: "4",
            title: "Motion in a Plane",
            topics: ["Vectors", "Projectile Motion", "Uniform Circular Motion"]
        },
        {
            id: 5,
            number: "5",
            title: "Laws of Motion",
            topics: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Applications"]
        },
        {
            id: 6,
            number: "6",
            title: "Work, Energy and Power",
            topics: ["Work Done by a Force", "Kinetic Energy", "Potential Energy", "Conservation of Energy"]
        },
    ];

    return (
        <div className="py-8 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <h1 className="text-3xl font-bold dark:text-indigo-300 text-indigo-600">
                    {subject} - Class {classNumber}
                </h1>
                <div className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                    <Link href="/subjects">
                        <span className="text-indigo-600 dark:text-indigo-400 hover:underline">← Back to Subjects</span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.map((chapter) => (
                    <div
                        key={chapter.id}
                        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-xl ${activeChapter === chapter.id ? 'ring-2 ring-indigo-500 transform scale-102' : ''
                            }`}
                    // onClick={() => setActiveChapter(chapter.id === activeChapter ? null : chapter.id)}
                    >
                        <div className="bg-indigo-500 dark:bg-indigo-700 px-4 py-3 flex items-center">
                            <span className="bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-bold">
                                {chapter.number}
                            </span>
                            <h2 className="text-lg font-semibold text-white flex-grow">{chapter.title}</h2>
                        </div>

                        <div className="p-4">
                            {activeChapter === chapter.id ? (
                                <div>
                                    <h3 className="font-medium mb-2 dark:text-gray-200">Key Topics:</h3>
                                    <ul className="space-y-1 mb-4">
                                        {chapter.topics.map((topic, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-indigo-500 dark:text-indigo-400 mr-2">•</span>
                                                <span className="dark:text-gray-300">{topic}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 flex justify-between">
                                        <Link href={`/notes/${classNumber}/${subject.toLowerCase()}/chapter-${chapter.number}`}>
                                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                                                View Notes
                                            </span>
                                        </Link>
                                        <Link href={`/practice/${classNumber}/${subject.toLowerCase()}/chapter-${chapter.number}`}>
                                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                                                Practice
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Click to view topics</p>
                                    <span className="text-indigo-500 dark:text-indigo-400">→</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}