"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Chapter = {
    id: string
    title: string
    description: string | null
    notesUrl: string
    chapterNumber: string | null
    classId: string
}

export default function ChapterNotesPage({ chapter, subjectName, className }: { chapter: Chapter, subjectName: string, className: string }) {
    const router = useRouter();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pdfError, setPdfError] = useState(false);
    const [scale, setScale] = useState(1);
    const [showControls, setShowControls] = useState(true);
    const objectRef = useRef<HTMLObjectElement>(null);
    const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

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
    }, [chapter.notesUrl]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
            if (e.ctrlKey && e.key === '=') {
                e.preventDefault();
                setScale(prev => Math.min(prev + 0.1, 2));
            }
            if (e.ctrlKey && e.key === '-') {
                e.preventDefault();
                setScale(prev => Math.max(prev - 0.1, 0.5));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullscreen]);

    useEffect(() => {
        if (isFullscreen) {
            const handleMouseMove = () => {
                setShowControls(true);

                if (controlsTimeout.current) {
                    clearTimeout(controlsTimeout.current);
                }

                controlsTimeout.current = setTimeout(() => {
                    setShowControls(false);
                }, 3000);
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
            };
        }
    }, [isFullscreen]);

    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));
    const handleResetZoom = () => setScale(1);

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50 dark:bg-gray-900">
            {!isFullscreen && (
                <>
                    <div className="bg-white dark:bg-gray-800 shadow-md">
                        <div className="container mx-auto px-4 py-3">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <Link href={`/notes/${subjectName}/${className}`}
                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 
                                    hover:underline flex items-center transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                    Back to Chapters
                                </Link>

                                <div className="flex items-center gap-2">
                                    <a
                                        href={chapter.notesUrl}
                                        download={`${subjectName}-${className}-${chapter.title}.pdf`}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg flex items-center 
                                        transition-colors shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download
                                    </a>

                                    <button
                                        onClick={() => setIsFullscreen(true)}
                                        className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-2 
                                        rounded-lg flex items-center transition-colors text-gray-700 dark:text-gray-200 
                                        shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                        </svg>
                                        <span className="hidden sm:inline">Fullscreen</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-800 text-white shadow-md">
                        <div className="container mx-auto px-4 py-3">
                            <div className="flex items-center">
                                <span className="bg-white text-indigo-600 rounded-full h-8 w-8 flex items-center justify-center mr-3 font-bold shadow-md">
                                    {chapter.chapterNumber || '?'}
                                </span>
                                <div>
                                    <h1 className="text-lg md:text-xl font-semibold capitalize">{subjectName} - {className}</h1>
                                    <h2 className="text-sm md:text-base text-indigo-100">{chapter.title}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className={`flex-grow p-2 md:p-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : ''}`}>
                <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg ${isFullscreen ? 'h-full' : 'h-[calc(100vh-200px)]'} relative w-full`}>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 z-10">
                            <div className="flex flex-col items-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-indigo-500"></div>
                                <p className="mt-3 text-indigo-600 dark:text-indigo-400">Loading PDF...</p>
                            </div>
                        </div>
                    )}

                    <div className="w-full h-full overflow-auto">
                        <div style={{ width: '100%', height: '100%' }}>
                            <object
                                ref={objectRef}
                                data={`${chapter.notesUrl}?dl=1`}
                                type="application/pdf"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    transform: `scale(${scale})`,
                                    transformOrigin: 'top center'
                                }}
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
                                                href={chapter.notesUrl}
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
                                                href={chapter.notesUrl}
                                                download={`${subjectName}-Class${className}-Chapter${chapter.chapterNumber}.pdf`}
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

                    <div
                        className={`absolute bottom-4 right-4 z-10 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full shadow-lg p-1 transition-opacity duration-300 ${isFullscreen && !showControls ? 'opacity-0' : 'opacity-100'}`}
                    >
                        <button
                            onClick={handleZoomOut}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                            title="Zoom Out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                        <button
                            onClick={handleResetZoom}
                            className="px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors mx-1"
                        >
                            {Math.round(scale * 100)}%
                        </button>
                        <button
                            onClick={handleZoomIn}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                            title="Zoom In"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isFullscreen && (
                <>
                    <div
                        className={`fixed top-0 left-0 right-0 bg-gradient-to-b from-gray-900 to-transparent bg-opacity-50 z-50 px-4 py-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="container mx-auto flex justify-between items-center">
                            <button
                                onClick={() => setIsFullscreen(false)}
                                className="text-white hover:text-indigo-200 p-2 rounded-lg flex items-center transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="hidden sm:inline">Exit Fullscreen</span>
                            </button>

                            <div className="hidden md:flex items-center">
                                <h3 className="text-white font-medium mr-2">
                                    {chapter.title}
                                </h3>
                                <span className="bg-white text-indigo-600 rounded-full h-6 w-6 flex items-center justify-center font-bold text-sm">
                                    {chapter.chapterNumber || '?'}
                                </span>
                            </div>

                            <a
                                href={chapter.notesUrl}
                                download={`${subjectName}-${className}-${chapter.title}.pdf`}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg flex items-center transition-colors shadow-sm hover:shadow-md text-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download
                            </a>
                        </div>
                    </div>

                    <div
                        className={`fixed top-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search in PDF..."
                                className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 w-40"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button className="text-indigo-600 dark:text-indigo-400 text-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Prev
                            </button>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">0 of 0</span>
                            <button className="text-indigo-600 dark:text-indigo-400 text-sm flex items-center">
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}