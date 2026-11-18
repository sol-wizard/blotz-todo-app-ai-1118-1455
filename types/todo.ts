// What one to-do looks like
export interface Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: string; // when it was added, e.g. "2026-11-18T09:30:00.000Z"
  dueDate?: string; // optional, e.g. "2026-11-30"
}
