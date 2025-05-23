'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, FileText, BookmarkIcon, Search } from 'lucide-react';

type Subject = {
    id: string;
    name: string;
    description: string | null;
    noteCount: number;
    hwCount: number;
    pyqCount: number;
};

export default function AdminPage({ subjects }: { subjects: Subject[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">Explore Subjects</h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                        Find notes, homework solutions, and previous year questions for your courses
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-12">
                    <div className="relative flex items-center">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Search subjects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSubjects.map((subject) => (
                        <Link href={`/admin/${subject.name.toLowerCase()}`} key={subject.id}>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700 cursor-pointer h-full flex flex-col">
                                <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2 capitalize">{subject.name}</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{subject.description}</p>

                                <div className="mt-auto">
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <div className="flex justify-between text-sm">
                                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                <BookOpen className="h-4 w-4 mr-1" />
                                                <span>{subject.noteCount} Notes</span>
                                            </div>
                                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                <FileText className="h-4 w-4 mr-1" />
                                                <span>{subject.hwCount} HWs</span>
                                            </div>
                                            <div className="flex items-center text-gray-500 dark:text-gray-400">
                                                <BookmarkIcon className="h-4 w-4 mr-1" />
                                                <span>{subject.pyqCount} PYQs</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredSubjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 dark:text-gray-300">No subjects found matching &quot;{searchTerm}&quot;</p>
                    </div>
                )}
            </div>
        </div>
    );
}
