import SubjectClassesPage from "@/components/AdminPages/SubjectClasses"
import AdminPage from "@/components/AdminPages/AdminPage"
import { prisma } from "../../../../db/prisma"
import ChaptersPage from "@/components/AdminPages/Chapters"

export default async function CatchAllRoutes({ params }: { params: { slug: string[] } }) {
    const slug = await params.slug || []

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
        return <ChaptersPage />
    }
    return (
        <h1>404 page not found!</h1>
    )
}