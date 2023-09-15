export interface Task {
  id: string;
  text: string;
  severity: string;
  done: boolean;
  updateTaskStatus: (taskId: string, newStatus: boolean) => void;
}

export interface Modal {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export interface SeverityProps {
  isModalOpen: boolean;
  handleSeverityChange: (severity: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}
