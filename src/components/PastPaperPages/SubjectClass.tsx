import Link from 'next/link';
import { BookOpen, ChevronRight, Layers, GraduationCap } from 'lucide-react';

type SubjectClass = {
    id: string;
    name: string;
    examPaperCount: number;
    subject: {
        id: string;
        name: string;
        description: string;
    };
}

export default function SubjectClassListPage({ subjectClass, subjectName }: { subjectClass: SubjectClass[]; subjectName: string }) {
    return (
        <div className="container max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center text-sm text-indigo-500 dark:text-indigo-300 mb-4">
                    <Link href="/admin/past-papers" className="hover:text-indigo-700 dark:hover:text-indigo-200 transition-colors">
                        Past-Papers
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-indigo-800 dark:text-white font-medium">{subjectName}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg sm:text-3xl font-bold text-indigo-900 dark:text-white mb-2 capitalize">{subjectName}</h1>
                        {subjectClass[0]?.subject.description && (
                            <p className="text-indigo-700 text-xs sm:text-base dark:text-indigo-200 max-w-2xl">{subjectClass[0]?.subject.description}</p>
                        )}
                    </div>
                    <div className="flex items-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full px-4 py-2 shadow-sm">
                        <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-300 mr-2" />
                        <span className="text-sm text-indigo-700 text-nowrap sm:text-base dark:text-indigo-100">{subjectClass.length} Classes</span>
                    </div>
                </div>
            </div>

            {subjectClass.length === 0 ? (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-12 text-center shadow-sm">
                    <Layers className="h-12 w-12 text-indigo-500 dark:text-indigo-400 mx-auto mb-4 opacity-70" />
                    <h3 className="text-xl font-medium text-indigo-800 dark:text-white mb-2">No Classes Available</h3>
                    <p className="text-indigo-600 dark:text-indigo-300 max-w-md mx-auto">
                        There are no classes available for {subjectName} yet. Check back later.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjectClass.filter((cls) => cls.examPaperCount > 0)
                        .map((cls) => (


                            <Link
                                href={`/past-papers/${subjectName}/${cls.name}`}
                                key={cls.id}
                                className="group bg-white dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/50 hover:border-indigo-500 dark:hover:border-indigo-600 rounded-xl p-6 transition-all hover:bg-indigo-50 dark:hover:bg-indigo-900/30 shadow-sm hover:shadow"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="bg-indigo-100 dark:bg-indigo-800/50 p-3 rounded-lg">
                                        <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-indigo-500 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-xl font-semibold text-indigo-800 dark:text-white mb-2">{cls.name}</h3>
                                <p className="text-indigo-600 dark:text-indigo-300 text-sm">
                                    Explore  exam papers for this class
                                </p>
                            </Link>
                        ))}
                </div>
            )}
        </div>
    );
}