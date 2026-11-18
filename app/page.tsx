"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import AddTodoDialog from "@/components/AddTodoDialog";
import TodoItem from "@/components/TodoItem";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "@/lib/api";
import type { TodoFormValues } from "@/lib/todoSchema";
import type { Todo } from "@/types/todo";

export default function Home() {
  // The to-do list is server state: TanStack Query loads it and keeps it
  // in the shared cache under the key ["todos"]
  const { data: todos = [], isPending, isError, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  // For now: call the API, then load the list again (step 4 changes this)
  async function handleAdd(values: TodoFormValues) {
    await createTodo(values.title, values.dueDate || undefined);
    await refetch();
  }

  async function handleToggle(todo: Todo) {
    await updateTodo(todo.id, { done: !todo.done });
    await refetch();
  }

  async function handleDelete(id: string) {
    await deleteTodo(id);
    await refetch();
  }

  return (
    <main className="mx-auto mt-16 max-w-md px-4">
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-3xl font-bold">My To-Do List</h1>
        <Link href="/about" className="text-indigo-600 hover:underline">
          About
        </Link>
      </div>
      <AddTodoDialog onAdd={handleAdd} />
      {/* useQuery tells us if the data is still loading or if it failed */}
      {isPending && <p className="text-gray-500">Loading tasks...</p>}
      {isError && (
        <p className="text-red-600">Could not load the tasks. Is json-server running?</p>
      )}
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </main>
  );
}
