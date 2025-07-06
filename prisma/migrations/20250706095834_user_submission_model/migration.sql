-- CreateTable
CREATE TABLE "UserSubmission" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "notesUrl" TEXT NOT NULL,
    "chapterNumber" TEXT,
    "classId" TEXT NOT NULL,

    CONSTRAINT "UserSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSubmission_title_classId_key" ON "UserSubmission"("title", "classId");

-- AddForeignKey
ALTER TABLE "UserSubmission" ADD CONSTRAINT "UserSubmission_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
