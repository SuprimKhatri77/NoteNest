import Link from 'next/link';
import { BookOpen, ChevronRight, FileText, Clock, Info } from 'lucide-react';

type Chapter = {
    id: string
    title: string
    notesUrl: string
    description: string | null
    chapterNumber: string | null
    classId: string
}

export default function ChapterListingPage({
    chapters,
    subjectName,
    className
}: {
    chapters: Chapter[],
    subjectName: string,
    className: string
}) {
    const sortedChapters = [...chapters].sort((a, b) => {
        if (a.chapterNumber && b.chapterNumber) {
            return parseInt(a.chapterNumber) - parseInt(b.chapterNumber);
        }
        return a.title.localeCompare(b.title);
    });

    return (
        <div className="container max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center text-sm text-indigo-500 dark:text-indigo-300 mb-4">
                    <Link href="/notes" className="hover:text-indigo-700 dark:hover:text-indigo-200 transition-colors">
                        Notes
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link
                        href={`/notes/${subjectName}`}
                        className="hover:text-indigo-700 dark:hover:text-indigo-200 transition-colors"
                    >
                        {subjectName}
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-indigo-800 dark:text-white font-medium">{className}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-indigo-900 dark:text-white mb-2 capitalize">
                            {subjectName}: {className}
                        </h1>
                        <p className="text-indigo-700 dark:text-indigo-200">
                            Explore all chapters and their study materials
                        </p>
                    </div>
                    <div className="flex items-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full px-4 py-2 shadow-sm">
                        <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-300 mr-2" />
                        <span className="text-indigo-700 dark:text-indigo-100">{chapters.length} Chapters</span>
                    </div>
                </div>
            </div>

            {chapters.length === 0 ? (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-12 text-center shadow-sm">
                    <FileText className="h-12 w-12 text-indigo-500 dark:text-indigo-400 mx-auto mb-4 opacity-70" />
                    <h3 className="text-xl font-medium text-indigo-800 dark:text-white mb-2">No Chapters Available</h3>
                    <p className="text-indigo-600 dark:text-indigo-300 max-w-md mx-auto">
                        There are no chapters available for {className} yet. Check back later.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {sortedChapters.map((chapter) => (
                        <div
                            key={chapter.id}
                            className="bg-white dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 hover:border-indigo-500 dark:hover:border-indigo-600 rounded-xl p-6 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/30 shadow-sm"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center">
                                    {chapter.chapterNumber && (
                                        <div className="bg-indigo-100 dark:bg-indigo-800/70 text-indigo-800 dark:text-indigo-200 font-medium rounded-full h-10 w-10 flex items-center justify-center mr-4">
                                            {chapter.chapterNumber}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-xl font-semibold text-indigo-800 dark:text-white">{chapter.title}</h3>
                                        {chapter.description && (
                                            <p className="text-indigo-600 dark:text-indigo-300 text-sm mt-1">
                                                {chapter.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    {chapter.description && (
                                        <button className="group flex items-center bg-indigo-50 dark:bg-indigo-800/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 text-indigo-600 dark:text-indigo-300 py-2 px-4 rounded-md transition-colors">
                                            <Info className="h-4 w-4 mr-2" />
                                            <span>Details</span>
                                        </button>
                                    )}
                                    <Link
                                        href={`/notes/${subjectName}/${className}/chapter-${chapter.chapterNumber}`}
                                        className="flex items-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white py-2 px-4 rounded-md transition-colors"
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        <span>Study Notes</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}