import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

// Shows ONE to-do. It gets the to-do and what to do on a click as props.
export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <Card className="flex flex-row items-center gap-3 px-4 py-3">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo)}
          className="h-4 w-4"
        />
        <span className={`flex-1 ${todo.done ? "text-muted-foreground line-through" : ""}`}>
          {todo.title}
        </span>
        <span className="text-right text-xs text-muted-foreground">
          Added {new Date(todo.createdAt).toLocaleDateString()}
          {todo.dueDate && (
            <>
              <br />
              Due {new Date(`${todo.dueDate}T00:00:00`).toLocaleDateString()}
            </>
          )}
        </span>
        <Button variant="destructive" size="sm" onClick={() => onDelete(todo.id)}>
          Delete
        </Button>
      </Card>
    </li>
  );
}
