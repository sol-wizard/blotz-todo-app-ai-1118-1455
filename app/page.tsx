import TodoItem from "@/components/TodoItem";
import { getAllTodos } from "@/lib/api";

export default async function Home() {
  // Wait for the API to send the to-dos, then draw them
  const todos = await getAllTodos();

  return (
    <main className="mx-auto mt-16 max-w-md px-4">
      <h1 className="mb-6 text-3xl font-bold">My To-Do List</h1>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </main>
  );
}
