"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { removeNote } from '../../../../actions/note';
import { useRouter } from 'next/navigation';


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

export default function PaperPage({ examPaper, subjectName, className }: { examPaper: Paper, subjectName: string, className: string }) {

    const router = useRouter();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pdfError, setPdfError] = useState(false);
    const objectRef = useRef<HTMLObjectElement>(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    useEffect(() => {
        if (objectRef.current) {
            const currentRef = objectRef.current;
            const handleLoad = () => setIsLoading(false);
            const handleError = () => {
                setIsLoading(false);
                setPdfError(true);
            };

            currentRef.addEventListener('load', handleLoad);
            currentRef.addEventListener('error', handleError);

            return () => {
                currentRef.removeEventListener('load', handleLoad);
                currentRef.removeEventListener('error', handleError);
            };
        }
    }, [examPaper?.paperUrl]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen]);

    const handleDelete = async () => {
        await removeNote(examPaper?.id);
        setShowDeleteModal(false);
        setDeleteSuccess(true);

        setTimeout(() => {
            router.push(`/admin`);
        }, 1500);
    };

    return (
        <div className="flex flex-col min-h-screen w-full">
            {deleteSuccess && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white p-4 rounded-md shadow-lg">
                    Exam Paper deleted successfully! Redirecting...
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 bg-[rgb(0,0,0,0.7)] flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md">
                        <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
                        <p className="mb-6">Are you sure you want to delete "{examPaper.type}"?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4  py-2 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 shadow-md">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="flex items-center gap-5 mb-3 md:mb-0">
                            <Link href={`/admin/past-papers/${subjectName}/${className}`}>
                                <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline flex items-center transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                    Back to PapersList
                                </span>
                            </Link>
                            <Link href={`/admin/${subjectName}/${className}/${examPaper.type}/edit/${examPaper.id}`}>
                                <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline flex items-center gap-2 transition-colors">
                                    <FontAwesomeIcon icon={faPen} className='text-xs' />
                                    <span className='pt-1'>
                                        Edit
                                    </span>
                                </span>
                            </Link>

                            <button onClick={() => setShowDeleteModal(true)}>
                                <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline flex items-center gap-2 transition-colors">
                                    <FontAwesomeIcon icon={faTrash} className='text-xs' />
                                    <span className='pt-1'>
                                        Delete
                                    </span>
                                </span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-3">
                            <a
                                href={examPaper.paperUrl}
                                download={`${subjectName}-Class${className}-${examPaper.type}.pdf`}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg flex items-center transition-colors shadow-sm hover:shadow-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download
                            </a>

                            <button
                                onClick={() => setIsFullscreen(!isFullscreen)}
                                className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-2 rounded-lg flex items-center transition-colors text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md"
                            >
                                {isFullscreen ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Exit
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                        </svg>
                                        Fullscreen
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 text-white shadow-md">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center">
                        <span className="bg-white text-indigo-600 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-bold shadow-md capitalize">
                            {subjectName.slice(0, 1) || '?'}
                        </span>
                        <div>
                            <h1 className="text-lg md:text-xl font-semibold capitalize">{subjectName} - {className}</h1>
                            <h2 className="text-sm md:text-base text-indigo-100">{examPaper.type}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`flex-grow bg-gray-50 dark:bg-gray-900 p-2 md:p-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`} style={{ width: isFullscreen ? '100%' : '100%' }}>
                <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${isFullscreen ? 'h-full' : 'h-screen'}`}>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 z-10">
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                                <p className="mt-3 text-indigo-600 dark:text-indigo-400">Loading PDF...</p>
                            </div>
                        </div>
                    )}

                    <object
                        ref={objectRef}
                        data={`${examPaper.paperUrl}?dl=1`}
                        type="application/pdf"
                        className="w-full h-full"
                    >
                        <div className="flex items-center justify-center h-full text-center p-4">
                            <div>
                                <div className="mb-4 text-indigo-600 dark:text-indigo-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Unable to display PDF directly in the browser.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-3">
                                    <a
                                        href={examPaper.paperUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200 px-4 py-2 rounded-lg inline-flex items-center justify-center transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Open in Browser
                                    </a>
                                    <a
                                        href={examPaper.paperUrl}
                                        download={`${subjectName}-${className}-${examPaper.type}.pdf`}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download PDF
                                    </a>
                                </div>
                            </div>
                        </div>
                    </object>
                </div>
            </div>

            {isFullscreen && (
                <div className="fixed top-4 right-4 z-50">
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full flex items-center justify-center transition-colors shadow-lg"
                        title="Exit Fullscreen"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );


}