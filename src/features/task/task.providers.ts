import { provide } from '@/inject';
import { TASKS$, TASKS_CATEGORIES$ } from './task.keys';
import { tasksCategoriesTransfer$, tasksTransfer$ } from './transfer';

export const tasksCategoriesProvider = () => {
  provide(TASKS_CATEGORIES$, tasksCategoriesTransfer$);
};

export const tasksProvider = () => {
  provide(TASKS$, tasksTransfer$);
};
