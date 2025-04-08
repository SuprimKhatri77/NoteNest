"use client"
import { Note } from "../page"
import { useActionState } from "react"
import { editNote } from "@/actions/note"
import { FormState } from "@/actions/note"

export default function EditNoteForm({ note }: { note: Note }) {
    const initialState: FormState = {
        errors: {}
    }

    const editNoteWithId = editNote.bind(null, note.id)
    const [state, formAction, isPending] = useActionState(editNoteWithId, initialState)
    return (
        <form action={formAction}>
            <div>
                <label>
                    Title:
                    <input type="text" name='title' defaultValue={note.title} className="border" />
                </label>
                {
                    state.errors.title && (
                        <p className="text-red-500"> {state.errors.title} </p>
                    )
                }
            </div>
            <div>
                <label>
                    Content:
                    <input type="text" name='content' defaultValue={note.content} className="border" />
                </label>
                {
                    state.errors.title && (
                        <p className="text-red-500"> {state.errors.content} </p>
                    )
                }
            </div>

            <button type="submit">
                {
                    isPending ? "Updating......" : "Update note"
                }
            </button>

        </form>
    )
}