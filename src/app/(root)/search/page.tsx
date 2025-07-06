import FilteredResultPage from "@/components/FilteredResult"
import prisma from "../../../../db/prisma"
import { redirect } from "next/navigation"

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q: query } = await searchParams || ""

    const notes = await prisma.chapter.findMany({
        where: {
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                { class: { subject: { name: { contains: query, mode: "insensitive" } } } }
            ]
        },
        include: {
            class: {
                include: {
                    subject: true
                }
            }
        }
    })

    const papers = await prisma.examPaper.findMany({
        where: {
            OR: [
                { type: { contains: query, mode: "insensitive" } },
                { class: { subject: { name: { contains: query, mode: "insensitive" } } } }
            ]
        },
        include: {
            class: {
                include: {
                    subject: true
                }
            }
        }
    })

    const results = [
        ...notes.map(note => ({
            id: note.id,
            title: note.title,
            contentType: "note" as const,
            description: note.description,
            chapterNumber: note.chapterNumber,
            classId: note.classId,
            notesUrl: note.notesUrl,
            subjectName: note.class.subject.name,
            className: note.class.name,
        })),
        ...papers.map(paper => ({
            id: paper.id,
            title: `${paper.type} - ${paper.class.subject.name}`,
            contentType: "pyq" as const,
            type: paper.type,
            year: paper.year,
            classId: paper.classId,
            paperUrl: paper.paperUrl,
            subjectName: paper.class.subject.name,
            className: paper.class.name
        }))
    ]

    if (!query) {
        return redirect("/")
    }
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Search Results for "{query}"
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Found {results.length} results
                </p>
            </div>

            <FilteredResultPage results={results} />
        </div>
    )
}