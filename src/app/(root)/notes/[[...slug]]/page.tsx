import SubjectClassesPage from "@/components/NotePages/SubjectClassesPage"
import NotesPage from "@/components/NotePages/NotesPage"
import prisma from "../../../../../db/prisma"
import ChapterListingPage from "@/components/NotePages/Chapter"
import ChapterNotesPage from "@/components/NotePages/ChapterNotes"



export default async function NotesSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params

    if (!slug || slug?.length === 0) {
        const subject = await prisma.subject.findMany({
            include: {
                classes: {
                    include: {
                        _count: {
                            select: {
                                chapters: true,
                                examPapers: true
                            }
                        }
                    }
                }
            }
        })

        const subjectsWithCounts = subject.map((sub: {
            id: string;
            name: string;
            description: string | null;
            classes: {
                _count: { chapters: number; examPapers: number }
            }[]
        }) => {
            let noteCount = 0;
            let pyqCount = 0;

            sub.classes.forEach((cls: {
                _count: { chapters: number; examPapers: number }
            }) => {
                noteCount += cls._count.chapters
                pyqCount += cls._count.examPapers
            })

            return {
                id: sub.id,
                name: sub.name,
                description: sub.description,
                noteCount,
                hwCount: noteCount,
                pyqCount
            }

        })

        return <NotesPage subjects={subjectsWithCounts} />
    }



    if (slug?.length === 1) {
        const subjectName = decodeURIComponent(slug[0])
        const subject = await prisma.subject.findFirst({
            where: { name: subjectName },
            include: {
                classes: true
            }
        })

        if (!subject) {
            throw new Error(`Subject of name ${slug[0]} not found!`)
        }

        const subjectClass = subject.classes.map((cls: {
            id: string;
            name: string;
            subjectId: string;
        }) => ({
            id: cls.id,
            name: cls.name,
            subject: {
                id: subject.id,
                name: subject.name,
                description: subject.description ?? ""
            }
        }))


        return <SubjectClassesPage subjectClass={subjectClass} subjectName={subjectName} />
    }


    if (slug?.length === 2) {
        const className = decodeURIComponent(slug[1])
        const subjectName = decodeURIComponent(slug[0])

        const subject = await prisma.subject.findFirst({
            where: {
                name: subjectName
            }
        })

        if (!subject) {
            throw new Error(`Subject of Name ${slug[0]} not found!`)
        }

        const subjectClass = await prisma.class.findFirst({
            where: {
                name: className,
                subjectId: subject.id
            }
        })


        if (!subjectClass) {
            throw new Error(`Class of name class-${slug[1]} and subject name ${slug[0]} not found!`)
        }

        const chapter = await prisma.chapter.findMany({
            where: {
                classId: subjectClass.id
            }
        })

        return <ChapterListingPage chapters={chapter} subjectName={subjectName} className={className} />
    }


    if (slug?.length === 3) {

        const subjectName = decodeURIComponent(slug[0])
        const className = decodeURIComponent(slug[1])
        const chapterNumber = decodeURIComponent(slug[2].replace("chapter-", ""))

        const chapter = await prisma.chapter.findFirst({
            where: {
                chapterNumber: chapterNumber,
                class: {
                    name: className,
                    subject: {
                        name: subjectName
                    }
                }
            }
        })

        if (!chapter) {
            throw new Error(`Chapter-${chapterNumber} not found!`)
        }

        return <ChapterNotesPage chapter={chapter} className={className} subjectName={subjectName} />
    }

    return (
        <h1>Page not found!</h1>
    )
}