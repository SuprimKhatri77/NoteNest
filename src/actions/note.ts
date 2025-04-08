"use server";

import { updateNote } from "@/app/prisma-db";
import { redirect } from "next/navigation";

export type Errors = {
  title?: string;
  content?: string;
};

export type FormState = {
  errors: Errors;
};

export async function editNote(
  id: number,
  prevState: FormState,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const errors: Errors = {};

  if (!title) {
    errors.title = "Title is required";
  }
  if (!content) {
    errors.content = "Content is required";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await updateNote({ id, title, content });
  redirect("/admin/notes");
}
