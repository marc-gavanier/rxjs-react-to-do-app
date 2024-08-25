import { describe, it, expect } from 'vitest';
import { BehaviorSubject, firstValueFrom, lastValueFrom, skip, take } from 'rxjs';
import { provide } from '@/inject';
import { TASKS$ } from '@/features/task/task.keys';
import { filterByCategory, markAsDone } from '../actions';
import { Task } from '../task';
import { TaskCategory } from '../task-category';
import { tasksQuery$ } from './tasks.query';

const ART_TASK_CATEGORY: TaskCategory = {
  id: '37a229f2-f551-4809-ab71-2d8c285f60b0',
  name: 'Art',
  emoji: '🎨',
  taskCount: 0,
  isActive: false
};

const ACTIVE_ART_TASK_CATEGORY: TaskCategory = { ...ART_TASK_CATEGORY, isActive: true };

const CONTACT_TASK_ID: string = 'e0c6d8a7-9a9e-4f18-a0bc-f6b8f41e4f9c';

const CONTACT_TASK: Task = {
  id: CONTACT_TASK_ID,
  description: 'Send an email to my future self asking for advice',
  emoji: '✉️',
  categoryName: 'Contact',
  dueDate: new Date('2024-09-17T00:00:00.000Z'),
  isDone: false
};

const ART_TASK_ID: string = '45d1b7e6-8f31-4e57-a3f1-dcb7b2a7d9f6';

const ART_TASK: Task = {
  id: ART_TASK_ID,
  description: 'Compose haikus for every popular javascript framework',
  emoji: '🎨',
  categoryName: 'Art',
  dueDate: new Date('2024-09-06T00:00:00.000Z'),
  isDone: false
};

describe('tasks query', (): void => {
  it('gets empty tasks', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([]);
    provide(TASKS$, tasks$);

    const tasks = firstValueFrom(tasksQuery$());

    expect(await tasks).toStrictEqual([]);
  });

  it('filters tasks by art category', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([CONTACT_TASK, ART_TASK]);
    provide(TASKS$, tasks$);

    const tasks = lastValueFrom(tasksQuery$().pipe(skip(1), take(1)));

    filterByCategory(ART_TASK_CATEGORY);

    expect(await tasks).toStrictEqual([ART_TASK]);
  });

  it('removes filter tasks by category when unselected', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([CONTACT_TASK, ART_TASK]);
    provide(TASKS$, tasks$);

    const tasks = lastValueFrom(tasksQuery$().pipe(skip(1), take(1)));

    filterByCategory(ACTIVE_ART_TASK_CATEGORY);

    expect(await tasks).toStrictEqual([CONTACT_TASK, ART_TASK]);
  });

  it('marks task matching id as done', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([CONTACT_TASK]);
    provide(TASKS$, tasks$);

    const tasks = lastValueFrom(tasksQuery$().pipe(skip(1), take(1)));

    markAsDone(CONTACT_TASK_ID);

    expect(await tasks).toStrictEqual([]);
  });

  it('marks task matching id as done and filters tasks by art category', async () => {
    const tasks$ = new BehaviorSubject<Task[]>([CONTACT_TASK, ART_TASK]);
    provide(TASKS$, tasks$);

    const tasks = lastValueFrom(tasksQuery$().pipe(skip(2), take(1)));

    markAsDone(ART_TASK_ID);
    filterByCategory(ART_TASK_CATEGORY);

    expect(await tasks).toStrictEqual([]);
  });
});
