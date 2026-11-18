import { z } from "zod";

// All the rules for the Add Task form live here, in one place
export const todoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Please enter a title")
    .max(50, "The title can be at most 50 characters"),
});

// The TypeScript type comes straight from the schema
export type TodoFormValues = z.infer<typeof todoFormSchema>;
