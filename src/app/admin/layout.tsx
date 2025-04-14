import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider"
import { ClerkProvider } from "@clerk/nextjs"
import "../globals.css"
import AdminNavbar from "@/components/AdminNavbar";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-poppins',
})


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>

            <html lang="en" suppressHydrationWarning>
                <body className={poppins.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="flex gap-2 min-w-full min-h-screen">
                            <div className="w-[20%] shrink-0 h-full">
                                <AdminNavbar />
                            </div>
                            <div className="w-[77%] mx-auto flex flex-col items-center mt-5">
                                {children}
                            </div>
                        </div>

                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}