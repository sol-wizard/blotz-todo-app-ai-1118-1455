import type { Todo } from "@/types/todo";

// The fake backend (json-server) runs here
const API_URL = "http://localhost:3001";

// Ask the API for all to-dos. Fetching takes time, so it is async.
export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) throw new Error("Could not load the to-dos");
  return response.json();
}

// Save a new to-do through the API. The API gives it an id and sends it back.
export async function createTodo(title: string, dueDate?: string): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // The date is saved with the to-do, at the moment it is added
    body: JSON.stringify({ title, done: false, createdAt: new Date().toISOString(), dueDate }),
  });
  if (!response.ok) throw new Error("Could not save the to-do");
  return response.json();
}

// Change one to-do (for example, mark it as done)
export async function updateTodo(id: string, changes: Partial<Todo>): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
  if (!response.ok) throw new Error("Could not update the to-do");
  return response.json();
}

// Delete one to-do
export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Could not delete the to-do");
}
