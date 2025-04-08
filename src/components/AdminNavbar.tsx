import Link from "next/link"
import ModeToggle from "./ModeToggle"

export default function AdminNavbar() {
    return (
        <>
            <header>
                <nav className=" shadow-md min-h-screen flex flex-col gap-10 py-3 px-4 dark:border-r-3">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-indigo-600">NoteNest</h1>
                        <ModeToggle />
                    </div>
                    <div className="flex flex-col gap-5">
                        <Link href='/admin/notes' className="text-lg  pl-2 py-2 rounded-md  hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:translate-x-1.5">All notes</Link>
                        <Link href='/admin' className="text-lg  pl-2 py-2 rounded-md  hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:translate-x-1.5">Create notes</Link>
                        <Link href='/admin' className="text-lg  pl-2 py-2 rounded-md  hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:translate-x-1.5">Assign roles</Link>
                        <Link href='/admin' className="text-lg  pl-2 py-2 rounded-md  hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out hover:translate-x-1.5">Submitted notes</Link>
                    </div>
                </nav>
            </header>
        </>

    )
}