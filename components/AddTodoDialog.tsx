"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { todoFormSchema, type TodoFormValues } from "@/lib/todoSchema";

interface AddTodoDialogProps {
  onAdd: (values: TodoFormValues) => Promise<void>;
}

// An "Add Task" button that opens a dialog with a form
export default function AddTodoDialog({ onAdd }: AddTodoDialogProps) {
  const [open, setOpen] = useState(false);

  // React Hook Form keeps the values and errors; the schema has the rules
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: { title: "", dueDate: "" },
  });
  const { errors, isSubmitting } = form.formState;

  // Only runs when the form is valid (the schema said OK)
  async function onSubmit(values: TodoFormValues) {
    try {
      await onAdd(values);
      form.reset(); // saved: clear the form
      setOpen(false);
    } catch {
      // not saved: keep the dialog open and what the user typed
      form.setError("root", { message: "Could not save the task. Please try again." });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="mb-6" />}>Add Task</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
          </DialogHeader>
          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              autoFocus
              placeholder="What do you need to do?"
              aria-invalid={!!errors.title}
              {...form.register("title")}
            />
            <FieldError errors={[errors.title]} />
          </Field>
          <Field data-invalid={!!errors.dueDate}>
            <FieldLabel htmlFor="dueDate">Due date (optional)</FieldLabel>
            <Input
              id="dueDate"
              type="date"
              aria-invalid={!!errors.dueDate}
              {...form.register("dueDate")}
            />
            <FieldError errors={[errors.dueDate]} />
          </Field>
          {errors.root && (
            <p role="alert" className="text-sm text-destructive">
              {errors.root.message}
            </p>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
