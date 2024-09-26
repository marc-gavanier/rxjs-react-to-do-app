import { describe, it, expect } from 'vitest';
import { BehaviorSubject, firstValueFrom, lastValueFrom, skip, take } from 'rxjs';
import { provide } from '@/inject';
import { TASKS$ } from '@/features/task/task.keys';
import { filterByCategory, Task, tasksQuery$ } from '../index';
import { TaskCategory } from '../task-category';
import { tasksCategoriesQuery$ } from './tasks-categories.query';

const ASK_FOR_ADVICE_CONTACT_TASK: Task = {
  id: 'e0c6d8a7-9a9e-4f18-a0bc-f6b8f41e4f9c',
  description: 'Send an email to my future self asking for advice',
  emoji: '✉️',
  categoryName: 'Contact',
  dueDate: new Date('2024-09-17T00:00:00.000Z'),
  isDone: false
};

const COMPOSE_HAIKUS_ART_TASK: Task = {
  id: '45d1b7e6-8f31-4e57-a3f1-dcb7b2a7d9f6',
  description: 'Compose haikus for every popular javascript framework',
  emoji: '🎨',
  categoryName: 'Art',
  dueDate: new Date('2024-09-06T00:00:00.000Z'),
  isDone: false
};

const MONA_LISA_ART_TASK: Task = {
  id: '7f8c3e1d-0f14-4934-9e98-c96b94919dbe',
  description: 'Recreate the Mona Lisa using sticky notes',
  emoji: '🎨',
  categoryName: 'Art',
  dueDate: new Date('2024-09-09T00:00:00.000Z'),
  isDone: false
};

const CONTACT_TASK_CATEGORY: TaskCategory = {
  name: 'Contact',
  emoji: '✉️',
  taskCount: 1,
  isActive: false
};

const ART_TASK_CATEGORY: TaskCategory = {
  name: 'Art',
  emoji: '🎨',
  taskCount: 1,
  isActive: false
};

const ACTIVE_ART_TASK_CATEGORY: TaskCategory = {
  ...ART_TASK_CATEGORY,
  isActive: true
};

describe('tasks categories query', (): void => {
  it('gets empty tasks categories', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([]);
    provide(TASKS$, tasks$);

    const tasksCategories = firstValueFrom(tasksCategoriesQuery$());

    expect(await tasksCategories).toStrictEqual([]);
  });

  it('gets single task category', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([ASK_FOR_ADVICE_CONTACT_TASK]);
    provide(TASKS$, tasks$);

    const tasksCategories = firstValueFrom(tasksCategoriesQuery$());

    expect(await tasksCategories).toStrictEqual([CONTACT_TASK_CATEGORY]);
  });

  it('gets two tasks categories', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([ASK_FOR_ADVICE_CONTACT_TASK, COMPOSE_HAIKUS_ART_TASK]);
    provide(TASKS$, tasks$);

    const tasksCategories = firstValueFrom(tasksCategoriesQuery$());

    expect(await tasksCategories).toStrictEqual([CONTACT_TASK_CATEGORY, ART_TASK_CATEGORY]);
  });

  it('ignore tasks marked as done in category count', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([ASK_FOR_ADVICE_CONTACT_TASK, { ...COMPOSE_HAIKUS_ART_TASK, isDone: true }]);
    provide(TASKS$, tasks$);

    const tasksCategories = firstValueFrom(tasksCategoriesQuery$());

    expect(await tasksCategories).toStrictEqual([CONTACT_TASK_CATEGORY]);
  });

  it('gets two tasks in the same task category', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([MONA_LISA_ART_TASK, COMPOSE_HAIKUS_ART_TASK]);
    provide(TASKS$, tasks$);

    const tasksCategories = firstValueFrom(tasksCategoriesQuery$());

    expect(await tasksCategories).toStrictEqual([{ ...ART_TASK_CATEGORY, taskCount: 2 }]);
  });

  it('selects contact category when filtered on category', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([ASK_FOR_ADVICE_CONTACT_TASK, COMPOSE_HAIKUS_ART_TASK]);
    provide(TASKS$, tasks$);
    await lastValueFrom(tasksQuery$().pipe(take(1)));

    const tasksCategories = lastValueFrom(tasksCategoriesQuery$().pipe(skip(2), take(1)));

    filterByCategory(ART_TASK_CATEGORY);

    expect(await tasksCategories).toStrictEqual([CONTACT_TASK_CATEGORY, { ...ART_TASK_CATEGORY, isActive: true }]);
  });

  it('unselects contact category when already filtered on category', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([ASK_FOR_ADVICE_CONTACT_TASK, COMPOSE_HAIKUS_ART_TASK]);
    provide(TASKS$, tasks$);
    await lastValueFrom(tasksQuery$().pipe(take(1)));

    const tasksCategories = lastValueFrom(tasksCategoriesQuery$().pipe(skip(2), take(1)));

    filterByCategory(ACTIVE_ART_TASK_CATEGORY);

    expect(await tasksCategories).toStrictEqual([CONTACT_TASK_CATEGORY, ART_TASK_CATEGORY]);
  });
});
