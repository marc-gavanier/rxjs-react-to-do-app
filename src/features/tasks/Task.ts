export type Task = {
  id: string;
  description: string;
  category: { emoji: string };
  dueDate: Date;
  checked?: boolean;
};
