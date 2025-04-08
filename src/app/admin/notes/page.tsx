import NotesList from "./notes-list"
import { getNotes } from "@/app/prisma-db"


export type Note = {
    title: string
    id: number
    content: string
}

export default async function NotesPage() {
    const notes: Note[] = await getNotes()

    return <NotesList notes={notes} />
}