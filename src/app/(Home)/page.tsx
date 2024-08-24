import { Metadata } from 'next';
import settings from '@/data/settings.json';
import tasks from '@/data/tasks.json';
import { TaskList } from './_components/TaskList';

export const metadata: Metadata = {
  title: `Home - ${settings.conferenceName} - Reactive todo app`
};

const toTaskFromJson = <T,>(task: T & { dueDate: string }) => ({ ...task, dueDate: new Date(task.dueDate) });

const HomePage = () => (
  <main className='container mt-5'>
    <div className='pb-5'>
      <h1>Hello, {settings.conferenceName}! 👋</h1>
      <div className='lead text-muted'>Today, {new Date().toDateString()}</div>
    </div>
    <h2 className='visually-hidden'>Task list</h2>
    <TaskList tasks={tasks.map(toTaskFromJson)} />
  </main>
);

export default HomePage;
