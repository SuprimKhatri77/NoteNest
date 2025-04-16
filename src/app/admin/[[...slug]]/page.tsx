import SubjectClassesPage from "@/components/AdminPages/SubjectClasses"
import AdminPage from "@/components/AdminPages/AdminPage"
import { prisma } from "../../../../db/prisma"
import ChaptersPage from "@/components/AdminPages/Chapters"
import ChapterNotes from "@/components/AdminPages/ChapterNotes"
import EditNoteForm from "@/components/AdminPages/EditNoteForm"

export default async function CatchAllRoutes({ params }: { params: { slug?: string[] } }) {
    const slug = params.slug ?? []

    if (slug.length === 0) {
        const subjects = await prisma.subject.findMany({
            include: {
                classes: {
                    include: {
                        _count: {
                            select: {
                                chapters: true,
                                examPapers: true,
                            },
                        },
                    },
                },
            },
        });

        const subjectsWithCounts = subjects.map((subject) => {
            let noteCount = 0;
            let pyqCount = 0;

            subject.classes.forEach((cls) => {
                noteCount += cls._count.chapters;
                pyqCount += cls._count.examPapers;
            });

            return {
                id: subject.id,
                name: subject.name,
                description: subject.description,
                noteCount,
                hwCount: noteCount,
                pyqCount,
            };
        });

        return <AdminPage subjects={subjectsWithCounts} />;
    }


    if (slug.length === 1) {
        const subjectName = decodeURIComponent(slug[0])
        const formattedSubjectName = subjectName.charAt(0).toUpperCase() + subjectName.slice(1)
        const subject = await prisma.subject.findFirst({
            where: {
                name: {
                    equals: formattedSubjectName,
                }
            },
            include: {
                classes: {
                    include: {
                        _count: {
                            select: {
                                chapters: true,
                                examPapers: true,
                            },
                        },
                    },
                },
            },
        });
        if (!subject) {
            throw new Error("Subjects not found")
        }
        const filteredClasses = subject.classes.map((cls) => ({
            id: cls.id,
            name: cls.name,
            // noteCount: cls._count.chapters,
            // pyqCount: cls._count.examPapers,
        }));
        return <SubjectClassesPage filteredClasses={filteredClasses} slugName={slug[0]} />
    }

    if (slug.length === 2) {

        const className = slug[1]
        const formattedClassName = decodeURIComponent(slug[1])
        // console.log(formattedClassName);
        const subjectClass = await prisma.class.findFirst({
            where: {
                name: formattedClassName
            },
            include: {
                chapters: true
            }
        })

        if (!subjectClass) {
            throw new Error("Class not found!")
        }

        const chapters = subjectClass.chapters.map((chap) => ({
            id: chap.id,
            description: chap.description ?? "",
            title: chap.title,
            chapterNumber: chap.chapterNumber ?? ""
        }))



        return <ChaptersPage chapters={chapters} className={slug[1]} subjectName={slug[0]} />
    }

    if (slug.length === 3) {

        const chapterName = decodeURIComponent(slug[2])
        const chapterNumber = chapterName.replace("chapter-", "")
        const chapter = await prisma.chapter.findFirst({
            where: {
                chapterNumber: chapterNumber
            },
        })

        if (!chapter) {
            throw new Error("Chapter not found!")
        }

        // const notes = chapter
        const className = decodeURIComponent(slug[1])
        const classNumber = className.replace("class", "")

        return <ChapterNotes chapter={chapter} classNumber={classNumber} className={className} subjectName={slug[0]} />
    }


    if (slug.length === 5 && slug[3] === "edit") {
        const chapterId = decodeURIComponent(slug[4])

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId
            },
            include: {
                class: {
                    include: {
                        subject: true
                    }
                }
            }

        })
        if (!chapter) {
            throw new Error("Chapter not found!")
        }
        return <EditNoteForm chapter={chapter} />
    }
    return (
        <h1>404 page not found!</h1>
    )
}