"use client";

import { useEffect, useState } from "react";
import AddTodoDialog from "@/components/AddTodoDialog";
import TodoItem from "@/components/TodoItem";
import { createTodo, getAllTodos } from "@/lib/api";
import type { Todo } from "@/types/todo";

export default function Home() {
  // The to-do list lives in state. When it changes, React redraws the page.
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load the to-dos from the API once, when the page opens
  useEffect(() => {
    getAllTodos().then(setTodos);
  }, []);

  async function handleAdd(title: string) {
    const newTodo = await createTodo(title);
    setTodos((current) => [...current, newTodo]);
  }

  return (
    <main className="mx-auto mt-16 max-w-md px-4">
      <h1 className="mb-6 text-3xl font-bold">My To-Do List</h1>
      <AddTodoDialog onAdd={handleAdd} />
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}
