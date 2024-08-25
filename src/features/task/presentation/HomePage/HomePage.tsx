'use client';

import settings from '@/data/settings.json';
import { Subscribe } from '@/reactivity/Subscribe';
import { tasksProvider } from '@/features/task';
import { Task, tasksQuery$ } from '@/features/task/domain';
import { TaskList } from './components/TaskList';

tasksProvider();

export const HomePage = ({ defaultTasks }: { defaultTasks: Task[] }) => (
  <main className='container mt-5'>
    <div className='pb-5'>
      <h1>Hello, {settings.conferenceName}! 👋</h1>
      <div className='lead text-muted'>Today, {new Date().toDateString()}</div>
    </div>
    <h2 className='visually-hidden'>Task list</h2>
    <Subscribe to$={tasksQuery$()} startWith={defaultTasks}>
      {({ value: tasks }: { value?: Task[] }) => <TaskList tasks={tasks ?? []} />}
    </Subscribe>
  </main>
);
