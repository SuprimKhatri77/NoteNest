"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useActionState, useState } from "react";
import Image from "next/image";
import { editPaper, FormState } from "../../../../actions/examPaper";
import { motion, AnimatePresence } from "framer-motion";

type Paper = {
    type: string;
    year: number;
    paperUrl: string;
    id: string;
    classId: string;

}

export default function EditExamPaperForm({ examPaper, subjectName, className }: { examPaper: Paper, subjectName: string, className: string }) {
    const [uploadedUrl, setUploadedUrl] = useState<string>('');
    const [uploadedFileName, setUploadedFileName] = useState<string>('');

    const initialState: FormState = {
        errors: {}
    } as FormState;

    const [state, formAction, isPending] = useActionState<FormState, FormData>(editPaper, initialState);

    return (
        <motion.form
            action={formAction}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-w-full mx-auto backdrop-blur-lg bg-white/80 dark:bg-zinc-900/70 shadow-2xl rounded-2xl px-8 py-10 space-y-8 border border-indigo-200 dark:border-indigo-700"
        >
            <input type="hidden" name="paperId" defaultValue={examPaper.id} />
            <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-4 tracking-wide">
                📚 Create a New Exam Paper
            </h2>

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
            >
                <label
                    htmlFor="paperType"
                    className="block text-sm font-semibold text-indigo-700 dark:text-indigo-300 capitalize"
                >
                    Type:
                </label>
                <input
                    id="paperType"
                    type="text"
                    name="type"
                    defaultValue={examPaper.type}
                    placeholder="eg: mid term"
                    className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-indigo-300 dark:border-indigo-600 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300"
                />
                {state.errors.type && (
                    <p className="text-sm text-red-500">{state.errors.type}</p>
                )}
            </motion.div>


            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
            >
                <label
                    htmlFor="paperYear"
                    className="block text-sm font-semibold text-indigo-700 dark:text-indigo-300 capitalize"
                >
                    Year:
                </label>
                <input
                    id="paperYear"
                    type="text"
                    name="year"
                    placeholder="eg: 2024"
                    defaultValue={examPaper.year}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-indigo-300 dark:border-indigo-600 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300"
                />
                {state.errors.year && (
                    <p className="text-sm text-red-500">{state.errors.year}</p>
                )}
            </motion.div>


            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
            >
                <label
                    htmlFor="paperClass"
                    className="block text-sm font-semibold text-indigo-700 dark:text-indigo-300 capitalize"
                >
                    Class:
                </label>
                <input
                    id="paperClass"
                    type="text"
                    name="className"
                    placeholder="eg: class 12"
                    defaultValue={className}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-indigo-300 dark:border-indigo-600 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300"
                />
                {state.errors.className && (
                    <p className="text-sm text-red-500">{state.errors.className}</p>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
            >
                <label
                    htmlFor="paperSubject"
                    className="block text-sm font-semibold text-indigo-700 dark:text-indigo-300 capitalize"
                >
                    Subject:
                </label>
                <input
                    id="paperSubject"
                    type="text"
                    name="subjectName"
                    defaultValue={subjectName}
                    placeholder="eg: Physics"
                    className="w-full px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-indigo-300 dark:border-indigo-600 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300"
                />
                {state.errors.subjectName && (
                    <p className="text-sm text-red-500">{state.errors.subjectName}</p>
                )}
            </motion.div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                    Image/PDF (preferred):
                </label>

                <CldUploadWidget
                    uploadPreset="NoteNest"
                    options={{ resourceType: "auto" }}
                    onSuccess={(result) => {
                        const info = result.info as { secure_url: string; original_filename: string };
                        if (info?.secure_url && info.original_filename) {
                            setUploadedUrl(info.secure_url);
                            setUploadedFileName(info.original_filename);
                        }
                    }}
                >
                    {({ open }) => (
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => open()}
                            className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            📤 Upload Image/PDF
                        </motion.button>
                    )}
                </CldUploadWidget>

                <AnimatePresence>
                    {(uploadedUrl || examPaper.paperUrl) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="mt-4 flex items-center gap-4 p-4 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl border border-indigo-300 dark:border-indigo-600 shadow-sm"
                        >
                            {(uploadedUrl || examPaper.paperUrl).match(/\.(jpeg|jpg|gif|png)$/) ? (
                                <div className="w-16 h-16 relative rounded-md overflow-hidden border bg-white dark:bg-zinc-800 flex-shrink-0">
                                    <Image fill src={uploadedUrl || examPaper.paperUrl} alt="Preview" className="object-cover" />
                                </div>
                            ) : (uploadedUrl || examPaper.paperUrl).match(/\.pdf$/) ? (
                                <div className="w-16 h-16 flex items-center justify-center text-3xl border rounded-md bg-white dark:bg-zinc-800">
                                    📄
                                </div>
                            ) : null}

                            <div className="flex-1">
                                <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 truncate">
                                    {uploadedFileName || examPaper.paperUrl.split("/").pop()}
                                </p>
                                <p className="text-xs text-indigo-600 dark:text-indigo-400">Currently uploaded</p>
                                <input type="hidden" name="paperUrl" value={uploadedUrl || examPaper.paperUrl} />
                            </div>

                            {uploadedUrl && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUploadedUrl('');
                                        setUploadedFileName('');
                                    }}
                                    className="ml-3 text-gray-400 hover:text-red-500 dark:hover:text-red-400 text-xl"
                                >
                                    ❌
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>


                {state.errors.paperUrl && (
                    <p className="text-sm text-red-500">{state.errors.paperUrl}</p>
                )}
            </div>

            <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isPending}
                className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 tracking-wide"
            >
                {isPending ? "Updating..." : "🚀 Update Exam Paper"}
            </motion.button>
        </motion.form>
    );
}
