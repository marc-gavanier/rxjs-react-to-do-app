import { map, Observable, of } from 'rxjs';
import tasksJson from '@/data/tasks.json';
import { Task } from '@/features/task/domain';

export type TaskTransfer = {
  id: string;
  description: string;
  categoryName: string;
  categoryEmoji: string;
  dueDate: string;
};

export const toTaskFromTransfer = (taskTransfer: TaskTransfer): Task => ({
  id: taskTransfer.id,
  description: taskTransfer.description,
  emoji: taskTransfer.categoryEmoji,
  categoryName: taskTransfer.categoryName,
  dueDate: new Date(taskTransfer.dueDate),
  isDone: false
});

export const tasksTransfer$: Observable<Task[]> = of(tasksJson).pipe(map((tasks) => tasks.map(toTaskFromTransfer)));
