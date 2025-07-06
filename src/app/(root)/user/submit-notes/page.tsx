"use client"

import { useActionState, useState } from "react"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, X, BookOpen, GraduationCap, Hash, Loader2, CheckCircle, AlertCircle } from "lucide-react"


import submitNote from "../../../../../actions/userNotesCreation"
import { FormState } from "../../../../../actions/userNotesCreation"



export default function AddNoteForm() {
    const [uploadedUrl, setUploadedUrl] = useState<string>("")
    const [uploadedFileName, setUploadedFileName] = useState<string>("")

    const initialState: FormState = { errors: {} } as FormState
    const [state, formAction, isPending] = useActionState<FormState, FormData>(submitNote, initialState)

    const handleRemoveFile = () => {
        setUploadedUrl("")
        setUploadedFileName("")
    }

    const isImage = uploadedUrl.match(/\.(jpeg|jpg|gif|png)$/i) !== null
    const isPDF = uploadedUrl.match(/\.pdf$/i) !== null

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                    <CardHeader className="text-center space-y-2 pb-8">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                            <BookOpen className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Submit Your Note
                        </CardTitle>
                        <CardDescription className="text-lg text-muted-foreground">
                            Upload and help other fellow students
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-8">
                        <form action={formAction} className="space-y-6">
                            {/* Title Field */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-base font-semibold flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Title
                                    <Badge variant="destructive" className="text-xs">
                                        Required
                                    </Badge>
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="e.g., Thermodynamics Fundamentals"
                                    className="h-12 text-base border-2 focus:border-blue-500 transition-all duration-200"
                                />
                                {state.errors?.title && (
                                    <Alert variant="destructive" className="py-2">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{state.errors.title}</AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            {/* Description Field */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Description
                                    <Badge variant="secondary" className="text-xs">
                                        Optional
                                    </Badge>
                                </Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    placeholder="e.g., Comprehensive notes covering the laws of thermodynamics..."
                                    className="min-h-[100px] text-base border-2 focus:border-blue-500 transition-all duration-200 resize-none"
                                />
                                {state.errors?.description && (
                                    <Alert variant="destructive" className="py-2">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{state.errors.description}</AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            {/* Academic Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="className" className="text-base font-semibold flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4" />
                                        Class
                                    </Label>
                                    <Input
                                        id="className"
                                        name="className"
                                        placeholder="e.g., Class 12"
                                        className="h-12 text-base border-2 focus:border-blue-500 transition-all duration-200"
                                    />
                                    {state.errors?.className && (
                                        <Alert variant="destructive" className="py-2">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{state.errors.className}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subjectName" className="text-base font-semibold flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        Subject
                                    </Label>
                                    <Input
                                        id="subjectName"
                                        name="subjectName"
                                        placeholder="e.g., Physics"
                                        className="h-12 text-base border-2 focus:border-blue-500 transition-all duration-200"
                                    />
                                    {state.errors?.subjectName && (
                                        <Alert variant="destructive" className="py-2">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{state.errors.subjectName}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="chapterNumber" className="text-base font-semibold flex items-center gap-2">
                                        <Hash className="w-4 h-4" />
                                        Chapter
                                    </Label>
                                    <Input
                                        id="chapterNumber"
                                        name="chapterNumber"
                                        placeholder="e.g., 1"
                                        className="h-12 text-base border-2 focus:border-blue-500 transition-all duration-200"
                                    />
                                    {state.errors?.chapterNumber && (
                                        <Alert variant="destructive" className="py-2">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>{state.errors.chapterNumber}</AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            </div>

                            {/* File Upload Section */}
                            <div className="space-y-4">
                                <Label className="text-base font-semibold flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Upload File
                                    <Badge variant="outline" className="text-xs">
                                        Image or PDF
                                    </Badge>
                                </Label>

                                {!uploadedUrl ? (
                                    <CldUploadWidget
                                        uploadPreset="NoteNest"
                                        options={{ resourceType: "auto" }}
                                        onSuccess={(result) => {
                                            const info = result.info as { secure_url: string; original_filename: string }
                                            if (info?.secure_url && info.original_filename) {
                                                setUploadedUrl(info.secure_url)
                                                setUploadedFileName(info.original_filename)
                                            }
                                        }}
                                    >
                                        {({ open }) => (
                                            <div
                                                onClick={() => open()}
                                                className="border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/50 transition-all duration-300 group"
                                            >
                                                <div className="flex flex-col items-center space-y-4">
                                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                        <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                                            Click to upload your file
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            Supports images (PNG, JPG) and PDF files
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CldUploadWidget>
                                ) : (
                                    <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/50">
                                        <CardContent className="p-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    {isImage ? (
                                                        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-md">
                                                            <Image
                                                                src={uploadedUrl || "/placeholder.svg"}
                                                                alt="Preview"
                                                                width={64}
                                                                height={64}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    ) : isPDF ? (
                                                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                                                            <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                                            <FileText className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2">
                                                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                        <p className="font-semibold text-green-800 dark:text-green-200">Upload Successful</p>
                                                    </div>
                                                    <p className="text-sm text-green-700 dark:text-green-300 truncate mt-1">{uploadedFileName}</p>
                                                    <Badge variant="outline" className="mt-2 text-xs">
                                                        {isImage ? "Image" : isPDF ? "PDF" : "File"}
                                                    </Badge>
                                                </div>

                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleRemoveFile}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <input type="hidden" name="notesUrl" value={uploadedUrl} />
                                        </CardContent>
                                    </Card>
                                )}

                                {state.errors?.notesUrl && (
                                    <Alert variant="destructive" className="py-2">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{state.errors.notesUrl}</AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Submitting Notes...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-5 h-5 mr-2" />
                                            Submit Notes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
