import Link from "next/link"
import ModeToggle from "./ModeToggle"

export default function AdminNavbar() {
    return (
        <>
            <header className="sticky top-0">
                <nav className="flex flex-col gap-10 py-3 px-4">
                    <div className="flex justify-between items-center">
                        <Link href='/admin' className="cursor-pointer  text-3xl font-bold text-indigo-600">NoteNest</Link>
                        <ModeToggle />
                    </div>
                    <div className="flex flex-col gap-5">
                        <Link href='/admin/past-papers' className="text-lg  pl-2 py-2 rounded-md  hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:translate-x-1.5">Papers List</Link>
                        <Link href='/admin/create-notes' className="text-lg  pl-2 py-2 rounded-md  hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:translate-x-1.5">Create notes</Link>
                        <Link href='/admin/past-papers/create-exam-papers' className="text-lg  pl-2 py-2 rounded-md  hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:translate-x-1.5">Create exam papers</Link>
                        <Link href='/admin' className="text-lg  pl-2 py-2 rounded-md  hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:translate-x-1.5">Assign roles</Link>
                        <Link href='/admin' className="text-lg  pl-2 py-2 rounded-md  hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:translate-x-1.5">Submitted notes</Link>
                    </div>
                </nav>
            </header>
        </>

    )
}