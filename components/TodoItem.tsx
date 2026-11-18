import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
}

// Shows ONE to-do. It only needs that one to-do as a prop.
export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-gray-900">
      <span>{todo.done ? "✅" : "⬜"}</span>
      <span className={todo.done ? "text-gray-400 line-through" : ""}>
        {todo.title}
      </span>
    </li>
  );
}
