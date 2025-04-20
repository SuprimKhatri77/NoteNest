"use client"
import { useState, useMemo } from 'react';
import { Search, FileText, Clock, BookOpen } from 'lucide-react';
import Link from 'next/link';
type Paper = {
    id: string;
    type: string;
    year: number;
    paperUrl: string;
    classId: string;
    class: {
        subject: {
            id: string;
            name: string;
            description: string | null;
        };
    } & {
        id: string;
        name: string;
        subjectId: string;
    };
}

export default function PaperListingPage({ examPapers, subjectName, className }: { examPapers: Paper[], subjectName: string, className: string }) {
    const [searchTerm, setSearchTerm] = useState('');

    const paperTypeGroups = useMemo(() => {
        const types = [...new Set(examPapers.map(paper => paper.type))];

        return types
            .filter(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(type => {
                const papersOfType = examPapers.filter(paper => paper.type === type);
                const count = papersOfType.length;
                const paperId = papersOfType.map(paper => paper.id)
                const years = papersOfType.map(paper => paper.year);
                const latestYear = Math.max(...years);
                const oldestYear = Math.min(...years);

                return {
                    type,
                    count,
                    latestYear,
                    oldestYear,
                    paperId

                };
            })
            .sort((a, b) => a.type.localeCompare(b.type));
    }, [examPapers, searchTerm]);

    if (examPapers.length === 0) {
        return (
            <div className="min-w-full flex flex-col items-center justify-center min-h-[60vh]">
                <BookOpen size={48} className="text-indigo-500 mb-4" />
                <h1 className="text-2xl font-bold mb-2">No papers available</h1>
                <p className="text-gray-600 dark:text-gray-400">No {subjectName} papers are currently available for {className}</p>
            </div>
        );
    }

    return (
        <div className="min-w-full py-6">
            <header className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 capitalize">
                    {subjectName} {className}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Select a paper type to browse available examination papers
                </p>
            </header>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search paper types..."
                        className="min-w-full px-10 py-2 rounded-md border border-indigo-200 dark:border-indigo-900/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {paperTypeGroups.length > 0 ? (
                <div className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paperTypeGroups.map((group) => (
                        <Link
                            href={`/admin/past-papers/${subjectName}/${className}/${group.paperId}`}
                            key={group.type}
                            className="min-w-full bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-900/30 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                        >
                            <div className="p-4 border-b-2 border-indigo-100 dark:border-indigo-900/30 bg-indigo-50 dark:bg-indigo-900/20 flex justify-between items-center">
                                <h2 className="font-bold text-lg text-indigo-700 dark:text-indigo-300">
                                    {group.type}
                                </h2>
                                <span className="bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-200 text-xs font-medium px-2 py-1 rounded">
                                    {group.count} {group.count === 1 ? 'Paper' : 'Papers'}
                                </span>
                            </div>

                            <div className="p-4">
                                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3">
                                    <Clock size={16} className="text-indigo-500 mr-2" />
                                    <span>
                                        {group.oldestYear === group.latestYear ?
                                            `${group.latestYear}` :
                                            `${group.oldestYear} - ${group.latestYear}`
                                        }
                                    </span>
                                </div>

                                <div className="flex items-center mt-3">
                                    <FileText size={16} className="text-indigo-500 mr-2" />
                                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                                        Click to view all papers
                                    </span>
                                </div>
                            </div>

                            <div className="px-4 py-3 bg-indigo-50 dark:bg-indigo-900/10 text-center">
                                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                                    View Collection
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="min-w-full flex flex-col items-center justify-center p-10 border border-indigo-100 dark:border-indigo-900/30 rounded-lg bg-white dark:bg-gray-800">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">No paper types match your search</p>
                    <button
                        onClick={() => setSearchTerm('')}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-md text-white transition-colors"
                    >
                        Clear search
                    </button>
                </div>
            )}
        </div>
    );
}
