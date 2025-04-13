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
        <form action={formAction} className="w-full max-w-lg border-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                    Title:
                    <input
                        type="text"
                        name="title"
                        placeholder="eg: Thermodynamics"
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                    description(optional):
                    <textarea
                        name="description"
                        placeholder="eg: thermodynamics is about..."
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
                        rows={3}
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                    class:
                    <input
                        type="text"
                        name="className"
                        placeholder="eg: class 12.."
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                    subject:
                    <input
                        type="text"
                        name="subjectName"
                        placeholder="eg: Physics"
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
                    />
                </label>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                    Image/PDF(preferred):
                </label>

                <div className="flex flex-col">
                    <CldUploadWidget
                        uploadPreset="NoteNest"
                        onSuccess={(result) => {
                            // Store the uploaded URL when successful
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
                                    className="w-full flex items-center justify-center px-4 py-2 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    Upload Image/PDF
                                </button>
                            );
                        }}
                    </CldUploadWidget>

                    {/* Show preview when upload is successful */}
                    {uploadedUrl && (
                        <div className="mt-3 flex items-center p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-md border border-indigo-100 dark:border-indigo-800">
                            {/* Preview thumbnail for images */}
                            {uploadedUrl.match(/\.(jpeg|jpg|gif|png)$/) !== null ? (
                                <div className="w-16 h-16 mr-3 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 flex-shrink-0">
                                    <img
                                        src={uploadedUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                // PDF icon for PDFs
                                <div className="w-16 h-16 mr-3 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            )}

                            <div className="flex-1">
                                <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 truncate">
                                    {uploadedFileName || "File uploaded"}
                                </p>
                                <p className="text-xs text-indigo-600 dark:text-indigo-400">
                                    Upload successful
                                </p>
                                {/* Hidden input to store the Cloudinary URL */}
                                <input type="hidden" name="notesUrl" value={uploadedUrl} />
                            </div>

                            {/* Remove button */}
                            <button
                                type="button"
                                onClick={() => {
                                    setUploadedUrl('');
                                    setUploadedFileName('');
                                }}
                                className="ml-2 p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                disabled={isPending}
            >
                {isPending ? "submitting....." : "Submit Notes"}
            </button>
        </form>
    )
}