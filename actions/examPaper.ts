"use server";
import { z } from "zod";
import {
  createExamPaper,
  deleteExamPaper,
  updateExamPaper,
} from "../db/prisma";
import { redirect } from "next/navigation";

export type Error = {
  type?: string;
  year?: string;
  className?: string;
  subjectName?: string;
  paperUrl?: string;
};

export type FormState = {
  errors: Error;
};

export async function addPaper(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const formFields = Object.fromEntries(formData);

  const PaperData = z.object({
    type: z.string().max(70),
    year: z.coerce.number().int(),
    className: z.string().max(20),
    subjectName: z.string().max(20),
    paperUrl: z.string(),
  });

  const validateFields = PaperData.safeParse(formFields);

  if (!validateFields.success) {
    const fieldErrors = validateFields.error.flatten().fieldErrors;

    return {
      errors: {
        type: fieldErrors.type?.[0],
        year: fieldErrors.year?.[0],
        className: fieldErrors.className?.[0],
        subjectName: fieldErrors.subjectName?.[0],
        paperUrl: fieldErrors.paperUrl?.[0],
      },
    };
  }

  await createExamPaper(validateFields.data);
  redirect("/admin/past-papers");

  return {
    errors: {},
  };
}

export async function editPaper(prevState: FormState, formData: FormData) {
  const formFields = Object.fromEntries(formData);
  const paperId = formFields.paperId as string;

  const PaperData = z.object({
    type: z.string().max(70),
    year: z.coerce.number().int(),
    className: z.string().max(20),
    subjectName: z.string().max(20),
    paperUrl: z.string(),
  });

  const validateFields = PaperData.safeParse(formFields);

  if (!validateFields.success) {
    const fieldErrors = validateFields.error.flatten().fieldErrors;

    return {
      errors: {
        type: fieldErrors.type?.[0],
        year: fieldErrors.year?.[0],
        className: fieldErrors.className?.[0],
        subjectName: fieldErrors.subjectName?.[0],
        paperUrl: fieldErrors.paperUrl?.[0],
      },
    };
  }

  await updateExamPaper({ id: paperId, ...validateFields.data });
  redirect("/admin/past-papers");
}

export async function removeExamPaper(id: string) {
  await deleteExamPaper(id);
}
