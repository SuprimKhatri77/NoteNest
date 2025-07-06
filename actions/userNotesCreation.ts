"use server";

import z from "zod";
import { userSubmission } from "../db/prisma";
import { redirect } from "next/navigation";

export type Errors = {
  title?: string;
  description?: string;
  notesUrl?: string;
  className?: string;
  subjectName?: string;
  chapterNumber?: string;
};

export type FormState = {
  errors: Errors;
};

export default async function submitNote(
  prevState: FormState,
  formData: FormData
) {
  const formFields = Object.fromEntries(formData);

  const NoteData = z.object({
    title: z.string().max(80),
    description: z.string().max(260),
    notesUrl: z.string(),
    className: z.string().max(70),
    subjectName: z.string().max(70),
    chapterNumber: z.string().max(30),
  });
  const validateFields = NoteData.safeParse(formFields);

  if (!validateFields.success) {
    const fieldErrors = validateFields.error.flatten().fieldErrors;
    return {
      errors: {
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
        notesUrl: fieldErrors.notesUrl?.[0],
        className: fieldErrors.className?.[0],
        subjectName: fieldErrors.subjectName?.[0],
        chapterNumber: fieldErrors.chapterNumber?.[0],
      },
    };
  }

  await userSubmission(validateFields.data);
  return redirect("/");
}
