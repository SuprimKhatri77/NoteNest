import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// CRUD for notes

// retrieve all notes
export async function getNotes() {
  await prisma.chapter.findMany();
}

// retrieve a particular note
export async function getNote(id: string) {
  await prisma.chapter.findUnique({
    where: { id },
  });
}

// create
export async function createNote({
  title,
  description,
  notesUrl,
  className,
  subjectName,
  chapterNumber,
}: {
  title: string;
  description: string;
  notesUrl: string;
  className: string;
  subjectName: string;
  chapterNumber: string;
}) {
  let subjectData = await prisma.subject.findUnique({
    where: { name: subjectName },
  });

  if (!subjectData) {
    subjectData = await prisma.subject.create({
      data: { name: subjectName },
    });
  }

  let classData = await prisma.class.findUnique({
    where: {
      name_subjectId: {
        name: className,
        subjectId: subjectData.id,
      },
    },
  });

  if (!classData) {
    classData = await prisma.class.create({
      data: {
        name: className,
        subjectId: subjectData.id,
      },
    });
  }

  const classId = classData.id;

  await prisma.chapter.create({
    data: {
      title,
      description,
      notesUrl,
      classId,
      chapterNumber,
    },
  });
}

// edit
export async function updateNote({
  id,
  title,
  description,
  notesUrl,
  className,
  subjectName,
  chapterNumber,
}: {
  id: string;
  title: string;
  description: string;
  notesUrl: string;
  className: string;
  subjectName: string;
  chapterNumber: string;
}) {
  const subjectData = await prisma.subject.findUnique({
    where: { name: subjectName },
  });

  if (!subjectData) {
    throw new Error(`Subject of name ${subjectName} not found!`);
  }

  const classData = await prisma.class.findUnique({
    where: {
      name_subjectId: {
        name: className,
        subjectId: subjectData.id,
      },
    },
  });
  if (!classData) {
    throw new Error(`Class of name ${className} not found`);
  }

  const classId = classData.id;

  await prisma.chapter.update({
    where: { id },
    data: { title, description, notesUrl, classId, chapterNumber },
  });
}

// delete
export async function deleteNote(id: string) {
  await prisma.chapter.delete({
    where: { id },
  });
}

// CRUD for Exam Papers

// retrieve all notes
export async function getExamPapers() {
  await prisma.examPaper.findMany();
}

// retrieve a particular note
export async function getExamPaper(id: string) {
  await prisma.examPaper.findUnique({
    where: { id },
  });
}

// create
export async function createExamPaper({
  type,
  year,
  paperUrl,
  className,
  subjectName,
}: {
  type: string;
  year: number;
  paperUrl: string;
  className: string;
  subjectName: string;
}) {
  let subjectData = await prisma.subject.findUnique({
    where: { name: subjectName },
  });

  if (!subjectData) {
    subjectData = await prisma.subject.create({
      data: { name: subjectName },
    });
  }

  let classData = await prisma.class.findUnique({
    where: {
      name_subjectId: {
        name: className,
        subjectId: subjectData.id,
      },
    },
  });

  if (!classData) {
    classData = await prisma.class.create({
      data: {
        name: className,
        subjectId: subjectData.id,
      },
    });
  }

  const classId = classData.id;

  await prisma.examPaper.create({
    data: {
      type,
      year,
      paperUrl,
      classId,
    },
  });
}

// edit
export async function editExamPaper({
  id,
  type,
  year,
  paperUrl,
  className,
  subjectName,
}: {
  id: string;
  type: string;
  year: number;
  paperUrl: string;
  className: string;
  subjectName: string;
}) {
  const subjectData = await prisma.subject.findUnique({
    where: { name: subjectName },
  });

  if (!subjectData) {
    throw new Error(`Subject of name ${subjectName} not found!`);
  }

  const classData = await prisma.class.findUnique({
    where: {
      name_subjectId: {
        name: className,
        subjectId: subjectData.id,
      },
    },
  });
  if (!classData) {
    throw new Error(`Class of name ${className} not found`);
  }

  const classId = classData.id;

  await prisma.examPaper.update({
    where: { id },
    data: { type, year, paperUrl, classId },
  });
}

// delete
export async function deleteExamPaper(id: string) {
  await prisma.chapter.delete({
    where: { id },
  });
}
