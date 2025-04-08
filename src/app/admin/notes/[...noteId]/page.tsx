import { getNote } from "@/app/prisma-db"
import { notFound } from "next/navigation"
import EditNoteForm from "./edit-note-form"
import { Note } from "../page"

export default async function EditNote({ params }: { params: Promise<{ noteId: string }> }) {
    const { noteId } = await params
    const note: Note | null = await getNote(parseInt(noteId))

    if (!note) {
        notFound()
    }

    return <EditNoteForm note={note} />
}