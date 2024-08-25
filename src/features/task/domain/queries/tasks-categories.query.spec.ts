import { describe, it, expect } from 'vitest';
import { BehaviorSubject, firstValueFrom, lastValueFrom, skip, take } from 'rxjs';
import { provide } from '@/inject';
import { TASKS_CATEGORIES$ } from '@/features/task/task.keys';
import { filterByCategory } from '../index';
import { TaskCategory } from '../task-category';
import { tasksCategoriesQuery$ } from './tasks-categories.query';

const CONTACT_TASK_CATEGORY: TaskCategory = {
  id: 'eff3ebed-21d8-4392-bc0c-34db5c746939',
  name: 'Contact',
  emoji: '✉️',
  taskCount: 0,
  isActive: false
};

const ART_TASK_CATEGORY: TaskCategory = {
  id: '37a229f2-f551-4809-ab71-2d8c285f60b0',
  name: 'Art',
  emoji: '🎨',
  taskCount: 0,
  isActive: false
};

const ACTIVE_ART_TASK_CATEGORY: TaskCategory = {
  ...ART_TASK_CATEGORY,
  isActive: true
};

describe('tasks categories query', (): void => {
  it('gets empty tasks categories', async () => {
    const taskCategories$ = new BehaviorSubject<TaskCategory[]>([]);
    provide(TASKS_CATEGORIES$, taskCategories$);

    const tasksCategories = firstValueFrom(tasksCategoriesQuery$());

    expect(await tasksCategories).toStrictEqual([]);
  });

  it('gets single task category', async () => {
    const taskCategories$ = new BehaviorSubject<TaskCategory[]>([CONTACT_TASK_CATEGORY]);
    provide(TASKS_CATEGORIES$, taskCategories$);

    const tasksCategories = firstValueFrom(tasksCategoriesQuery$());

    expect(await tasksCategories).toStrictEqual([CONTACT_TASK_CATEGORY]);
  });

  it('gets two tasks categories', async () => {
    const taskCategories$ = new BehaviorSubject<TaskCategory[]>([CONTACT_TASK_CATEGORY, ART_TASK_CATEGORY]);
    provide(TASKS_CATEGORIES$, taskCategories$);

    const tasksCategories = firstValueFrom(tasksCategoriesQuery$());

    expect(await tasksCategories).toStrictEqual([CONTACT_TASK_CATEGORY, ART_TASK_CATEGORY]);
  });

  it('selects contact category when filtered on category', async () => {
    const taskCategories$ = new BehaviorSubject<TaskCategory[]>([CONTACT_TASK_CATEGORY, ART_TASK_CATEGORY]);
    provide(TASKS_CATEGORIES$, taskCategories$);

    const tasksCategories = lastValueFrom(tasksCategoriesQuery$().pipe(skip(1), take(1)));

    filterByCategory(ART_TASK_CATEGORY);

    expect(await tasksCategories).toStrictEqual([CONTACT_TASK_CATEGORY, { ...ART_TASK_CATEGORY, isActive: true }]);
  });

  it('unselects contact category when already filtered on category', async () => {
    const taskCategories$ = new BehaviorSubject<TaskCategory[]>([CONTACT_TASK_CATEGORY, ACTIVE_ART_TASK_CATEGORY]);
    provide(TASKS_CATEGORIES$, taskCategories$);

    const tasksCategories = lastValueFrom(tasksCategoriesQuery$().pipe(skip(1), take(1)));

    filterByCategory(ACTIVE_ART_TASK_CATEGORY);

    expect(await tasksCategories).toStrictEqual([CONTACT_TASK_CATEGORY, ART_TASK_CATEGORY]);
  });
});
