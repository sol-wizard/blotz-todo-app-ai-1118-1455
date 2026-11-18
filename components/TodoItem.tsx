import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

// Shows ONE to-do. It gets the to-do and what to do on a click as props.
export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3 text-gray-900">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo)}
        className="h-4 w-4"
      />
      <span className={`flex-1 ${todo.done ? "text-gray-400 line-through" : ""}`}>
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-sm text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </li>
  );
}
