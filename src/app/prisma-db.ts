import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedProducts = async () => {
  const count = await prisma.note.count();
  if (count === 0) {
    await prisma.note.createMany({
      data: [
        { title: "note 1", content: "description 1" },
        { title: "note 2", content: "description 3" },
        { title: "note 3", content: "description 2" },
      ],
    });
  }
};

seedProducts();

// read
export async function getNotes() {
  return prisma.note.findMany();
}

// fetch one
export async function getNote(id: number) {
  return prisma.note.findUnique({
    where: { id },
  });
}

// create
export async function addNote({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return prisma.note.create({
    data: { title, content },
  });
}

// edit
export async function updateNote({
  id,
  title,
  content,
}: {
  id: number;
  title: string;
  content: string;
}) {
  return prisma.note.update({
    where: { id },
    data: { title, content },
  });
}

// delete
export async function deleteNote(id: number) {
  return prisma.note.delete({
    where: { id },
  });
}
