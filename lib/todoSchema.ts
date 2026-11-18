import { z } from "zod";

// Today's date as "YYYY-MM-DD" in the user's own time zone
function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

// All the rules for the Add Task form live here, in one place
export const todoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Please enter a title")
    .max(50, "The title can be at most 50 characters"),
  // Optional due date ("" = no due date), but never before today
  dueDate: z
    .string()
    .refine((date) => date === "" || date >= todayString(), {
      message: "The due date can't be before today",
    }),
});

// The TypeScript type comes straight from the schema
export type TodoFormValues = z.infer<typeof todoFormSchema>;
