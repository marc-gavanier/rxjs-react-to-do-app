import { describe, expect, it } from 'vitest';
import { Task } from '@/features/task/domain';
import { TaskTransfer, toTaskFromTransfer } from './task.transfer';

describe('task transfer', () => {
  it('map task transfer to domain', () => {
    const taskTransfer: TaskTransfer = {
      id: '2d2f76f7-3b59-4a56-9f0b-634cf4aeb07f',
      description: 'Organize my closet by the average wear time of each clothing item',
      categoryName: 'Home',
      categoryEmoji: '🏠',
      dueDate: '2024-09-20T00:00:00.000Z'
    };

    const task: Task = toTaskFromTransfer(taskTransfer);

    expect(task).toStrictEqual<Task>({
      id: '2d2f76f7-3b59-4a56-9f0b-634cf4aeb07f',
      description: 'Organize my closet by the average wear time of each clothing item',
      emoji: '🏠',
      categoryName: 'Home',
      dueDate: new Date('2024-09-20T00:00:00.000Z'),
      isDone: false
    });
  });
});
