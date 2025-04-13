import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="mt-10 flex flex-col justify-center items-center">
            <ClerkLoading>
                <div
                    className="inline-block border-indigo-600 h-8 w-8 animate-spin rounded-full border-4 border-solid border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </ClerkLoading>

            <ClerkLoaded>
                <SignIn />
            </ClerkLoaded>
        </div>
    );
}
