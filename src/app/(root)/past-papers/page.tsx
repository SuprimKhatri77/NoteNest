"use client"
import { useState } from 'react';
import { Search, ChevronRight, Download, BookOpen, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PastPapersPage() {

  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('subjects'); // 'subjects', 'classes', 'papers'

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', description: 'Study of numbers, quantities, and shapes', slug: 'mathematics' },
    { id: 'physics', name: 'Physics', description: 'Study of matter, energy, and the interaction between them', slug: 'physics' },
    { id: 'computer-science', name: 'Computer Science', description: 'Study of computers and computational systems', slug: 'computer-science' },
    { id: 'chemistry', name: 'Chemistry', description: 'Study of the composition, properties, and behavior of matter', slug: 'chemistry' },
  ];





  // Filter content based on search and current view
  const filteredSubjects = subjects.filter(subject =>
    !searchQuery || subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );




  // const searchLower = searchQuery.toLowerCase();




  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">Past Papers</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Access previous years' question papers to enhance your exam preparation
          </p>
        </div>



        {/* Search Section */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeView === 'subjects' ? 'subjects' : activeView === 'classes' ? 'classes' : 'papers'}...`}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>



        {activeView === 'subjects' && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Select a Subject</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{subject.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{subject.description}</p>
                    <div className="flex items-center justify-end text-indigo-600 dark:text-indigo-400">
                      View Classes <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredSubjects.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <div className="mx-auto h-16 w-16 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">No subjects found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search to find what you're looking for.</p>
              </div>
            )}
          </>
        )}






      </main>
    </div>
  );
}