import { TaskCategory } from './task-category';

export type Task = {
  id: string;
  description: string;
  categoryName: string;
  emoji: string;
  dueDate: Date;
  isDone: boolean;
};

const shouldFilterWith = (categoryFilter?: TaskCategory) => categoryFilter != null && !categoryFilter.isActive;

export const byCategory =
  (categoryFilter?: TaskCategory) =>
  (task: Task): boolean =>
    shouldFilterWith(categoryFilter)
      ? categoryFilter?.emoji === task.emoji && categoryFilter?.name === task.categoryName
      : true;

export const onlyRemainingTasks = (task: Task): boolean => !task.isDone;

export const markTaskAsDone =
  (markAsDoneId?: string) =>
  (task: Task): Task =>
    task.id === markAsDoneId ? { ...task, isDone: true } : task;
