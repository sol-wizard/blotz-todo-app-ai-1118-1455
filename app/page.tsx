import TodoItem from "@/components/TodoItem";
import type { Todo } from "@/types/todo";

// Hard-coded for now. In step 4 these come from an API.
const todos: Todo[] = [
  { id: "1", title: "Watch the React video", done: true },
  { id: "2", title: "Build the to-do app", done: false },
  { id: "3", title: "Open a PR", done: false },
];

export default function Home() {
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
