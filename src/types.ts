export interface Task {
  id: string;
  text: string;
  severity: string;
  done: boolean;
  updateTaskStatus: (taskId: string, newStatus: boolean) => void;
}
