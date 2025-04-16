"use client"

import { useActionState, useState, useEffect } from "react"
import { CldUploadWidget } from 'next-cloudinary';
import { FormState } from "../../../actions/note"
import { editNote } from "../../../actions/note"

type Chapter = {
    id: string
    title: string
    description: string | null
    notesUrl: string
    chapterNumber: string | null
    classId: string
    class: {
        id: string
        name: string
        subject: {
            id: string,
            name: string
            description: string | null
        }
    }
}

export default function EditNoteForm({ chapter }: { chapter: Chapter }) {
    const initialState: FormState = {
        errors: {}
    }

    const [uploadedUrl, setUploadedUrl] = useState<string>('');
    const [uploadedFileName, setUploadedFileName] = useState<string>('');
    const [prevUploadUrl, setPrevUploadUrl] = useState<boolean>(false)

    useEffect(() => {
        if (chapter.notesUrl) {
            setUploadedUrl(chapter.notesUrl);
            const filename = chapter.notesUrl.split('/').pop() || 'Previous file';
            setUploadedFileName(filename);
            setPrevUploadUrl(true)
        }
    }, [chapter.notesUrl]);

    const [state, formAction, isPending] = useActionState(editNote, initialState)

    return (
        <div className="w-[77%] mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b pb-2 dark:border-gray-700">Edit Chapter: {chapter.title}</h1>

            <form action={formAction} className="space-y-4">
                <input type="hidden" name="chapterId" value={chapter.id} />

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="title">
                        Title:
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={chapter.title}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                        ${state.errors?.title
                                ? 'border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900'
                                : 'border-gray-300 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-800'}`}
                    />
                    {state.errors?.title && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.title}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        defaultValue={chapter.description || ""}
                        rows={4}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                        ${state.errors?.description
                                ? 'border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900'
                                : 'border-gray-300 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-800'}`}
                    ></textarea>
                    {state.errors?.description && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.description}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="chapterNumber">
                        Chapter Number:
                    </label>
                    <input
                        type="text"
                        name="chapterNumber"
                        id="chapterNumber"
                        defaultValue={chapter.chapterNumber || ""}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                        ${state.errors?.chapterNumber
                                ? 'border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900'
                                : 'border-gray-300 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-800'}`}
                    />
                    {state.errors?.chapterNumber && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.chapterNumber}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="className">
                        Class:
                    </label>
                    <input
                        type="text"
                        name="className"
                        id="className"
                        defaultValue={chapter.class.name || ""}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                        ${state.errors?.className
                                ? 'border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900'
                                : 'border-gray-300 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-800'}`}
                    />
                    {state.errors?.className && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.className}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="subjectName">
                        Subject:
                    </label>
                    <input
                        type="text"
                        name="subjectName"
                        id="subjectName"
                        defaultValue={chapter.class.subject.name || ""}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                        ${state.errors?.subjectName
                                ? 'border-red-500 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900'
                                : 'border-gray-300 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-800'}`}
                    />
                    {state.errors?.subjectName && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.subjectName}</p>
                    )}
                </div>
                <div className="relative">
                    <label className="text-gray-700 dark:text-gray-200 text-sm font-semibold block mb-2">
                        Image/PDF (preferred)
                    </label>

                    {chapter.notesUrl && !uploadedUrl && (
                        <div className="mb-3 flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="w-16 h-16 mr-3 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                    Previously uploaded file
                                </p>
                                <a
                                    href={chapter.notesUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    View current file
                                </a>
                                <input type="hidden" name="notesUrl" value={chapter.notesUrl} />
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col">
                        <CldUploadWidget
                            uploadPreset="NoteNest"
                            options={{
                                resourceType: "auto",
                            }}
                            onSuccess={(result) => {
                                const info = result.info as { secure_url: string; original_filename: string };
                                if (info?.secure_url && info.original_filename) {
                                    setUploadedUrl(info.secure_url);
                                    setUploadedFileName(info.original_filename);
                                }
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <button
                                        type="button"
                                        onClick={() => open()}
                                        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg dark:from-indigo-600 dark:to-indigo-800 dark:hover:from-indigo-700 dark:hover:to-indigo-900"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        Upload New Image/PDF
                                    </button>
                                );
                            }}
                        </CldUploadWidget>

                        {uploadedUrl && (
                            <div className="mt-3 flex items-center p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800 shadow-sm">
                                {uploadedUrl.match(/\.(jpeg|jpg|gif|png)$/) !== null ? (
                                    <div className="w-16 h-16 mr-3 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 flex-shrink-0">
                                        <img
                                            src={uploadedUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : uploadedUrl.match(/\.pdf$/) !== null ? (
                                    <div className="w-16 h-16 mr-3 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                ) : null}

                                <div className="flex-1">
                                    <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 truncate">
                                        {uploadedFileName || "File uploaded"}
                                    </p>


                                    <p className="text-xs text-indigo-600 dark:text-indigo-400">
                                        Upload successful
                                    </p>
                                    <input type="hidden" name="notesUrl" value={uploadedUrl} />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUploadedUrl('');
                                        setUploadedFileName('');
                                    }}
                                    className="ml-2 p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors bg-white dark:bg-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}

                    </div>
                    {state.errors?.notesUrl && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.notesUrl}</p>
                    )}
                </div>


                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}