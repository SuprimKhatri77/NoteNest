import ExamPaperDashbaord from "@/components/AdminPages/ExamPages/PaperDashboard"
import prisma from "../../../../../db/prisma"
import SubjectClassListPage from "@/components/AdminPages/ExamPages/SubjectClass"
import PaperListingPage from "@/components/AdminPages/ExamPages/PapersListing"
import PaperPage from "@/components/AdminPages/ExamPages/Paper"

export default async function ExamSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = (await params)

    if (!slug || slug.length === 0) {
        const subjects = await prisma.subject.findMany()
        return <ExamPaperDashbaord subjects={subjects} />
    }

    if (slug.length === 1) {
        const subjectName = decodeURIComponent(slug[0])
        const subject = await prisma.subject.findFirst({
            where: { name: subjectName },
            include: {
                classes: {
                    include: {
                        _count: {
                            select: {
                                examPapers: true
                            }
                        }
                    }
                }
            }
        })

        if (!subject) {
            throw new Error(`Subject of name ${slug[0]} not found!`)
        }


        const subjectClass = subject.classes.map((cls: {
            id: string;
            name: string;
            subjectId: string;
            _count: { examPapers: number };
        }) => {

            return {
                id: cls.id,
                name: cls.name,
                examPaperCount: cls._count.examPapers,
                subject: {
                    id: subject.id,
                    name: subject.name,
                    description: subject.description ?? ""
                }
            }
        });


        return <SubjectClassListPage subjectClass={subjectClass} subjectName={subjectName} />
    }

    if (slug.length === 2) {
        const subjectName = decodeURIComponent(slug[0])
        const className = decodeURIComponent(slug[1])

        const examPapers = await prisma.examPaper.findMany({
            where: {
                class: {
                    name: className,
                    subject: {
                        name: subjectName
                    }
                }
            },
            include: {
                class: {
                    include: {
                        subject: true
                    }
                }
            }
        })
        if (!examPapers) {
            throw new Error(`Paper not found for subject name ${subjectName} and ${className}`)
        }


        return <PaperListingPage examPapers={examPapers} subjectName={subjectName} className={className} />
    }

    if (slug.length === 3) {
        const subjectName = decodeURIComponent(slug[0])
        const className = decodeURIComponent(slug[1])
        const paperId = slug[2]

        const examPaper = await prisma.examPaper.findFirst({
            where: {
                id: paperId,
                class: {
                    name: className,
                    subject: {
                        name: subjectName
                    }
                }
            },
            include: {
                class: {
                    include: {
                        subject: true
                    }
                }
            }
        })

        if (!examPaper) {
            throw new Error(`Paper not found for subject name ${subjectName} and ${className}`)
        }
        return <PaperPage examPaper={examPaper} subjectName={subjectName} className={className} />
    }
    return (
        <h1>Exam pages not found</h1>
    )
}