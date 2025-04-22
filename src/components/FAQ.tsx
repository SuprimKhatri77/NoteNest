import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion"

export default function FaqSection() {
    return (
        <div className="p-4 font-['Poppins']">
            <h2 className="text-xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full cursor-pointer space-y-2 mx-3">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline cursor-pointer">
                        What is NoteNest?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        NoteNest is a platform where students can find notes, previous year questions, and study materials.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline cursor-pointer">
                        Is it free to use?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        Yes! NoteNest is completely free to use for all students.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline cursor-pointer">
                        Do I need to sign up to access notes?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        No sign-up is required to browse notes, but creating an account allows you to contribute your own notes.
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-medium hover:no-underline cursor-pointer">
                        Can I contribute my own notes or papers?
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        Absolutely! Registered users can upload notes and question papers to help the community grow.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
