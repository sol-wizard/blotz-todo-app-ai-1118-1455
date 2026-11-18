import type { Todo } from "@/types/todo";

// The fake backend (json-server) runs here
const API_URL = "http://localhost:3001";

// Ask the API for all to-dos. Fetching takes time, so it is async.
export async function getAllTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`, { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load the to-dos");
  return response.json();
}
