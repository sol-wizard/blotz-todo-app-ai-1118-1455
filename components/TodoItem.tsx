import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
}

// Shows ONE to-do. It only needs that one to-do as a prop.
export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li>
      {todo.done ? "✅" : "⬜"} {todo.title}
    </li>
  );
}
