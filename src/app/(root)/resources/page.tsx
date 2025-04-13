"use client"
import { useState } from 'react';
import Link from 'next/link';

type Resource = {
  notes: {
    id: number
    title: string
    subject: string
    downloads: number
  }[],
  homeworks: {
    id: number,
    title: string
    subject: string
    deadline: string
  }[],
  pyqs: {
    id: number
    title: string
    subject: string
    year: string
  }[]
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('notes');

  const resources: Resource = {
    notes: [
      { id: 1, title: "Data Structures Notes", subject: "Computer Science", downloads: 324 },
      { id: 2, title: "Algorithms Complete Guide", subject: "Computer Science", downloads: 217 },
      { id: 3, title: "Calculus Fundamentals", subject: "Mathematics", downloads: 189 },
      { id: 4, title: "Physics Mechanics", subject: "Physics", downloads: 156 },
    ],
    homeworks: [
      { id: 1, title: "Assignment 1: Linked Lists", subject: "Computer Science", deadline: "Next Week" },
      { id: 2, title: "Problem Set 3: Derivatives", subject: "Mathematics", deadline: "Tomorrow" },
      { id: 3, title: "Lab Report: Circuits", subject: "Physics", deadline: "In 3 days" },
    ],
    pyqs: [
      { id: 1, title: "2023 Midterm Exam", subject: "Computer Science", year: "2023" },
      { id: 2, title: "2022 Final Exam", subject: "Mathematics", year: "2022" },
      { id: 3, title: "2021 Quiz Collection", subject: "Physics", year: "2021" },
      { id: 4, title: "2023 Practice Questions", subject: "Chemistry", year: "2023" },
    ]
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [resourceType] = useState<'notes' | 'homeworks' | 'pyqs'>('notes');

  const filteredResources = resources[resourceType].filter((resource) =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );




  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">


      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-6">Study Resources</h1>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Resource Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition duration-150 ease-in-out ${activeTab === 'notes'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab('homeworks')}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition duration-150 ease-in-out ${activeTab === 'homeworks'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            Homeworks
          </button>
          <button
            onClick={() => setActiveTab('pyqs')}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition duration-150 ease-in-out ${activeTab === 'pyqs'
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
          >
            Previous Year Questions
          </button>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{resource.title}</h3>
                  <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    {resource.subject}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  {/* {activeTab === 'notes' && (
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      <span>{resource.downloads} downloads</span>
                    </div>
                  )}
                  
                  {activeTab === 'homeworks' && (
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      <span>Due: {resource.deadline}</span>
                    </div>
                  )}
                  
                  {activeTab === 'pyqs' && (
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      <span>Year: {resource.year}</span>
                    </div>
                  )} */}

                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-3 rounded text-sm transition-colors duration-300">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-10">
            <div className="text-gray-500 dark:text-gray-400">No resources found matching your search.</div>
          </div>
        )}

        {/* Upload Resources Section */}
        <div className="mt-12 bg-indigo-50 dark:bg-gray-800 p-6 rounded-lg border border-indigo-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">Contribute Resources</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Help fellow students by sharing your notes, homework solutions, or previous year&apos;s questions.
          </p>
          <div className="flex space-x-4">
            <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Resources
            </button>
            <Link href="/guidelines" className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium py-2 px-4 transition-colors duration-300">
              View Guidelines
            </Link>
          </div>
        </div>
      </main>


    </div>
  );
}