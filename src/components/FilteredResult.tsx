"use client"
import { useState } from 'react';

type ResultItem = {
    id: string
    title: string
    contentType: "note" | "pyq"
    type?: string
    description?: string | null
    notesUrl?: string
    chapterNumber?: string | null
    classId: string
    paperUrl?: string
    year?: number
    subjectName?: string
    className: string
}

export default function FilteredResultPage({ results }: { results: ResultItem[] }) {
    const [filter, setFilter] = useState<"all" | "note" | "pyq">("all");

    if (results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-full p-6 mb-6">
                    <div className="text-6xl">😕</div>
                </div>
                <h3 className="text-2xl font-medium text-gray-800 dark:text-gray-200 mb-2">No results found</h3>
                <p className="text-gray-500 text-center dark:text-gray-400">Try adjusting your search terms or filters</p>
            </div>
        );
    }

    const filteredResults = filter === "all"
        ? results
        : results.filter(item => item.contentType === filter);

    const noteCount = results.filter(r => r.contentType === "note").length;
    const pyqCount = results.filter(r => r.contentType === "pyq").length;

    const getGradientClass = (contentType: string) => {
        return contentType === "note"
            ? "from-indigo-500 to-purple-600"
            : "from-indigo-600 to-blue-500";
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap gap-3 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-full max-w-md mx-auto cursor-pointer">
                <button
                    onClick={() => setFilter("all")}
                    className={`flex-1 cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition duration-200 ${filter === "all"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                        }`}
                >
                    All ({results.length})
                </button>
                <button
                    onClick={() => setFilter("note")}
                    className={`flex-1 cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition duration-200 ${filter === "note"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                        }`}
                >
                    Notes ({noteCount})
                </button>
                <button
                    onClick={() => setFilter("pyq")}
                    className={`flex-1 cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition duration-200 ${filter === "pyq"
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                        }`}
                >
                    PYQs ({pyqCount})
                </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResults.map(item => (
                    <div
                        key={item.id}
                        className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                    >
                        <div className={`h-2 bg-gradient-to-r ${getGradientClass(item.contentType)}`}></div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors capitalize">
                                    {item.title || (item.contentType === "pyq" ? `${item.type} Paper (${item.year})` : "Untitled")}
                                </h3>

                                <span className={`ml-2 flex-shrink-0 ${item.contentType === "note"
                                    ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                                    } px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1`}
                                >
                                    {item.contentType === "note" ? "📝 Note" : "📄 PYQ"}
                                </span>
                            </div>

                            {item.subjectName && (
                                <div className="mb-3">
                                    <span className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                        {item.subjectName}
                                    </span>
                                </div>
                            )}

                            {item.contentType === "note" && item.description && (
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                    {item.description}
                                </p>
                            )}

                            {item.contentType === "pyq" && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {item.type && (
                                        <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded">
                                            {item.type}
                                        </span>
                                    )}
                                    {item.year && (
                                        <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded">
                                            {item.year}
                                        </span>
                                    )}
                                    {item.className && (
                                        <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded">
                                            {item.className}
                                        </span>

                                    )}
                                </div>
                            )}

                            {(item.contentType === "note" && item.chapterNumber) && (item.contentType === "note" && item.className) && (
                                <div className='flex gap-3'>
                                    <div className="mt-3">
                                        <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded">
                                            Chapter {item.chapterNumber}
                                        </span>
                                    </div>
                                    <div className="mt-3">
                                        <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded">
                                            {item.className}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <a
                                    href={item.contentType === "note" ? item.notesUrl : item.paperUrl}
                                    className="inline-flex items-center font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                                >
                                    {item.contentType === "note" ? "Read Notes" : "Download Paper"}
                                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredResults.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-full mb-4">
                        <svg className="w-12 h-12 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <p className="text-lg font-medium">No {filter} content matches your search</p>
                    <p className="mt-1">Try changing your filters or search terms</p>
                </div>
            )}
        </div>
    );
}