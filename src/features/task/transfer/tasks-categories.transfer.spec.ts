import { describe, expect, it } from 'vitest';
import { TaskCategory } from '@/features/task/domain';
import { TaskTransfer } from './task.transfer';
import { toTaskCategoriesFromTasks } from './tasks-categories.transfer';

describe('tasks categories transfer', () => {
  it('map tasks transfer to tasks category domain', () => {
    const taskTransfer: TaskTransfer = {
      id: '6db9d3b8-27c9-42e3-8e56-9cbe34b5e9c3',
      description: 'Sort my bookshelves by the frequency of the letter “e” in each book title',
      categoryName: 'Home',
      categoryEmoji: '🏠',
      dueDate: '2024-09-19T00:00:00.000Z'
    };

    const taskCategory = toTaskCategoriesFromTasks([], taskTransfer, 0);

    expect(taskCategory).toStrictEqual<TaskCategory[]>([
      {
        id: '0',
        name: 'Home',
        emoji: '🏠',
        taskCount: 1,
        isActive: false
      }
    ]);
  });

  it('merges categories with same name and same emoji', () => {
    const taskTransfers: TaskTransfer[] = [
      {
        id: '6db9d3b8-27c9-42e3-8e56-9cbe34b5e9c3',
        description: 'Sort my bookshelves by the frequency of the letter “e” in each book title',
        categoryName: 'Home',
        categoryEmoji: '🏠',
        dueDate: '2024-09-19T00:00:00.000Z'
      },
      {
        id: '2d2f76f7-3b59-4a56-9f0b-634cf4aeb07f',
        description: 'Organize my closet by the average wear time of each clothing item',
        categoryEmoji: '🏠',
        categoryName: 'Home',
        dueDate: '2024-09-20T00:00:00.000Z'
      }
    ];

    const taskCategories = taskTransfers.reduce(toTaskCategoriesFromTasks, []);

    expect(taskCategories).toStrictEqual<TaskCategory[]>([
      {
        id: '0',
        name: 'Home',
        emoji: '🏠',
        taskCount: 2,
        isActive: false
      }
    ]);
  });

  it('merges multiple categories with same name and same emoji', () => {
    const taskTransfers: TaskTransfer[] = [
      {
        id: '6db9d3b8-27c9-42e3-8e56-9cbe34b5e9c3',
        description: 'Sort my bookshelves by the frequency of the letter “e” in each book title',
        categoryName: 'Home',
        categoryEmoji: '🏠',
        dueDate: '2024-09-19T00:00:00.000Z'
      },
      {
        id: '45d1b7e6-8f31-4e57-a3f1-dcb7b2a7d9f6',
        description: 'Compose haikus for every popular javascript framework',
        categoryEmoji: '🎨',
        categoryName: 'Art',
        dueDate: '2024-09-06T00:00:00.000Z'
      },
      {
        id: '2d2f76f7-3b59-4a56-9f0b-634cf4aeb07f',
        description: 'Organize my closet by the average wear time of each clothing item',
        categoryEmoji: '🏠',
        categoryName: 'Home',
        dueDate: '2024-09-20T00:00:00.000Z'
      },
      {
        id: '7f8c3e1d-0f14-4934-9e98-c96b94919dbe',
        description: 'Recreate the Mona Lisa using sticky notes',
        categoryEmoji: '🎨',
        categoryName: 'Art',
        dueDate: '2024-09-09T00:00:00.000Z'
      }
    ];

    const taskCategories = taskTransfers.reduce(toTaskCategoriesFromTasks, []);

    expect(taskCategories).toStrictEqual<TaskCategory[]>([
      {
        id: '0',
        name: 'Home',
        emoji: '🏠',
        taskCount: 2,
        isActive: false
      },
      {
        id: '1',
        name: 'Art',
        emoji: '🎨',
        taskCount: 2,
        isActive: false
      }
    ]);
  });
});
