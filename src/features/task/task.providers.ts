import { provide } from '@/inject';
import { TASKS$ } from './task.keys';
import { tasksTransfer$ } from './transfer';

export const tasksProvider = () => {
  provide(TASKS$, tasksTransfer$);
};
