"use client"
import Link from 'next/link';

type Class = {
    id: string
    name: string
}

export default function SubjectsClasses({ filteredClasses, slugName }: { filteredClasses: Class[], slugName: string }) {
    const formattedSlug = decodeURIComponent(slugName)
    return (
        <>
            {filteredClasses.length > 0 ? (
                <div className="px-4">
                    <h1 className="text-3xl font-bold mb-8 text-center dark:text-indigo-300 text-indigo-600">
                        Browse Subjects by Class
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredClasses.map((cls) => (
                            <Link
                                href={`/admin/${slugName}/${cls.name.toLowerCase()}`}
                                key={cls.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 border-2"
                            >
                                <div className="bg-indigo-500 dark:bg-indigo-700 px-4 py-3">
                                    <h2 className="text-xl font-semibold text-white">{cls.name}</h2>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-500 dark:text-gray-400">Click to view subjects</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center text-lg mt-10">
                    No classes found for the subject <span className="font-semibold">{formattedSlug.charAt(0).toUpperCase() + formattedSlug.slice(1)}</span>
                </p>
            )}
        </>
    );
}
