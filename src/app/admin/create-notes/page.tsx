"use client"
import { useActionState, useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import addNote from '../../../../actions/note';
import { FormState } from '../../../../actions/note';

export default function AddNote() {
    const [uploadedUrl, setUploadedUrl] = useState<string>('');
    const [uploadedFileName, setUploadedFileName] = useState<string>('');

    const initialState: FormState = {
        errors: {}
    } as FormState

    const [state, formAction, isPending] = useActionState<FormState, FormData>(addNote, initialState)

    return (
        <div className="flex justify-center items-center w-full py-8">
            <form action={formAction} className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Add New Note</h2>
                <div className="space-y-6">
                    <div className="relative">
                        <label className="text-gray-700 dark:text-gray-200 text-sm font-semibold">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="eg: Thermodynamics"
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white text-sm transition-all duration-200"
                        />
                        {state.errors?.title && (
                            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.title}</p>
                        )}
                    </div>

                    <div className="relative">
                        <label className="text-gray-700 dark:text-gray-200 text-sm font-semibold">
                            Description (optional)
                        </label>
                        <textarea
                            name="description"
                            placeholder="eg: thermodynamics is about..."
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white text-sm transition-all duration-200"
                            rows={3}
                        />
                        {state.errors?.description && (
                            <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="text-gray-700 dark:text-gray-200 text-sm font-semibold">
                                Class
                            </label>
                            <input
                                type="text"
                                name="className"
                                placeholder="eg: Class 12"
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white text-sm transition-all duration-200"
                            />
                            {state.errors?.className && (
                                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.className}</p>
                            )}
                        </div>

                        <div className="relative">
                            <label className="text-gray-700 dark:text-gray-200 text-sm font-semibold">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subjectName"
                                placeholder="eg: Physics"
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white text-sm transition-all duration-200"
                            />
                            {state.errors?.subjectName && (
                                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.subjectName}</p>
                            )}
                        </div>
                        <div className="relative">
                            <label className="text-gray-700 dark:text-gray-200 text-sm font-semibold">
                                Chapter Number
                            </label>
                            <input
                                type="text"
                                name="chapterNumber"
                                placeholder="eg: 1"
                                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white text-sm transition-all duration-200"
                            />
                            {state.errors?.chapterNumber && (
                                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.chapterNumber}</p>
                            )}
                        </div>
                    </div>

                    <div className="relative">
                        <label className="text-gray-700 dark:text-gray-200 text-sm font-semibold block mb-2">
                            Image/PDF (preferred)
                        </label>

                        <div className="flex flex-col">
                            <CldUploadWidget
                                uploadPreset="NoteNest"
                                options={{
                                    resourceType: "auto",
                                }}
                                onSuccess={(result) => {
                                    const info = result.info as { secure_url: string; original_filename: string };
                                    if (info?.secure_url && info.original_filename) {
                                        // console.log(info.secure_url)

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
                                            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            Upload Image/PDF
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
                    </div>
                    {state.errors?.notesUrl && (
                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{state.errors.notesUrl}</p>
                    )}
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            "Submit Notes"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}