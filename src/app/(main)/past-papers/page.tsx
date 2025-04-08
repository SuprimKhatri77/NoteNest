"use client"
import { useState } from 'react';
import Head from 'next/head';
import { Search, Filter, Download, ChevronDown } from 'lucide-react';

export default function PastPapersPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');

  const papers = [
    { id: 1, title: 'Data Structures and Algorithms', year: '2024', semester: 'Spring', subject: 'Computer Science', downloads: 543 },
    { id: 2, title: 'Calculus II', year: '2023', semester: 'Fall', subject: 'Mathematics', downloads: 421 },
    { id: 3, title: 'Introduction to Psychology', year: '2023', semester: 'Spring', subject: 'Psychology', downloads: 356 },
    { id: 4, title: 'Organic Chemistry', year: '2022', semester: 'Fall', subject: 'Chemistry', downloads: 289 },
    { id: 5, title: 'Digital Logic Design', year: '2022', semester: 'Spring', subject: 'Electrical Engineering', downloads: 412 },
    { id: 6, title: 'Microeconomics', year: '2021', semester: 'Fall', subject: 'Economics', downloads: 317 },
  ];

  const filteredPapers = papers.filter(paper => {
    return (selectedSubject === 'All Subjects' || paper.subject === selectedSubject) &&
      (selectedYear === 'All Years' || paper.year === selectedYear) &&
      (selectedSemester === 'All Semesters' || paper.semester === selectedSemester);
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>Past Papers | StudyNotes</title>
        <meta name="description" content="Access past papers, homework solutions, and practice questions" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">Past Papers</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Access previous year&apos;s question papers to enhance your exam preparation
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search papers by keyword, course code..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transform ${showFilters ? 'rotate-180' : ''} transition-transform`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
                  >
                    <option>All Subjects</option>
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Psychology</option>
                    <option>Economics</option>
                    <option>Electrical Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
                  >
                    <option>All Years</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100"
                  >
                    <option>All Semesters</option>
                    <option>Spring</option>
                    <option>Summer</option>
                    <option>Fall</option>
                    <option>Winter</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{paper.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{paper.subject}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                    {paper.semester} {paper.year}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Download className="h-4 w-4 mr-1" /> {paper.downloads} downloads
                  </span>
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-16 w-16 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No papers found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" aria-current="page" className="z-10 bg-indigo-50 dark:bg-indigo-900 border-indigo-500 dark:border-indigo-500 text-indigo-600 dark:text-indigo-200 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              1
            </a>
            <a href="#" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              2
            </a>
            <a href="#" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
              ...
            </span>
            <a href="#" className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
              8
            </a>
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </main>
    </div>
  );
}