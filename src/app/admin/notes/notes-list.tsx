import Link from "next/link"


export type Note = {
    title: string
    id: number
    content: string
}

export default function NotesList({ notes }: { notes: Note[] }) {
    return (
        <>
            <ul className="text-3xl font-bold text-white  flex gap-5">
                {
                    notes.map((note) => (
                        <Link href={`/admin/notes/${note.id}`} key={note.id} className="bg-red-500 mt-2">
                            <li> {note.title} </li>
                            <li> {note.content} </li>
                        </Link>
                    ))
                }
            </ul>
        </>
    )
}