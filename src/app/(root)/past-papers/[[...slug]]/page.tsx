import PastPapersPage from "@/components/PastPaperPages/PastPaperPage";
import prisma from "../../../../../db/prisma";
import SubjectClassListPage from "@/components/PastPaperPages/SubjectClass";
import PaperListingPage from "@/components/PastPaperPages/PaperLisitng";
import PaperPage from "@/components/PastPaperPages/Paper";

export default async function PastPaperSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = (await params);

    if (!slug || slug.length === 0) {
        const subjects = await prisma.subject.findMany()
        return <PastPapersPage subjects={subjects} />
    }

    if (slug.length === 1) {
        const subjectName = decodeURIComponent(slug[0])
        const subject = await prisma.subject.findFirst({
            where: {
                name: subjectName
            },
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
            throw new Error(`Subject of name ${subjectName} not found!`);
        }

        const subjectClass = subject.classes.map((cls: {
            _count: {
                examPapers: number;
            };
        } & {
            id: string;
            name: string;
            subjectId: string;
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
        const subjectName = decodeURIComponent(slug[0]);
        const className = decodeURIComponent(slug[1]);
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
            throw new Error(`Exam Papers not found for the subject of name ${subjectName} and ${className}`);
        }

        return <PaperListingPage examPapers={examPapers} className={className} subjectName={subjectName} />
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
        <h1>Failed to load the page!</h1>
    )
}