import { PrismaClient as SqliteClient } from "./prisma/generated/sqlite/index.js";
import { PrismaClient as PostgresClient } from "./prisma/generated/postgres/index.js";

const sqlite = new SqliteClient();
const postgres = new PostgresClient();

async function transferData() {
  try {
    const subjects = await sqlite.subject.findMany({
      include: {
        classes: {
          include: {
            chapters: true,
            examPapers: true,
          },
        },
      },
    });

    for (const subject of subjects) {
      const createdSubject = await postgres.subject.create({
        data: {
          name: subject.name,
          description: subject.description,
        },
      });

      for (const cls of subject.classes) {
        const createdClass = await postgres.class.create({
          data: {
            name: cls.name,
            subjectId: createdSubject.id,
          },
        });

        for (const chapter of cls.chapters) {
          await postgres.chapter.create({
            data: {
              title: chapter.title,
              description: chapter.description,
              notesUrl: chapter.notesUrl,
              chapterNumber: chapter.chapterNumber,
              classId: createdClass.id,
            },
          });
        }

        for (const paper of cls.examPapers) {
          await postgres.examPaper.create({
            data: {
              type: paper.type,
              year: paper.year,
              paperUrl: paper.paperUrl,
              classId: createdClass.id,
            },
          });
        }
      }

      console.log(`✅ Migrated subject: ${subject.name}`);
    }
  } catch (err) {
    console.error("❌ Error during migration:", err);
  } finally {
    await sqlite.$disconnect();
    await postgres.$disconnect();
  }
}

transferData();
