"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AddTodoDialog from "@/components/AddTodoDialog";
import TodoItem from "@/components/TodoItem";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "@/lib/api";
import type { TodoFormValues } from "@/lib/todoSchema";
import type { Todo } from "@/types/todo";

export default function Home() {
  // The to-do list lives in state. When it changes, React redraws the page.
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load the to-dos from the API once, when the page opens
  useEffect(() => {
    getAllTodos().then(setTodos);
  }, []);

  async function handleAdd(values: TodoFormValues) {
    const newTodo = await createTodo(values.title, values.dueDate || undefined);
    setTodos((current) => [...current, newTodo]);
  }

  // Event -> call the API -> update the state (and so the page)
  async function handleToggle(todo: Todo) {
    const updated = await updateTodo(todo.id, { done: !todo.done });
    setTodos((current) => current.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function handleDelete(id: string) {
    await deleteTodo(id);
    setTodos((current) => current.filter((t) => t.id !== id));
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
