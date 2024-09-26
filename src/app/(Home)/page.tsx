import { Metadata } from 'next';
import { firstValueFrom } from 'rxjs';
import settings from '@/data/settings.json';
import { tasksProvider } from '@/features/task';
import { tasksQuery$ } from '@/features/task/domain';
import { HomePage } from '@/features/task/presentation';

export const metadata: Metadata = {
  title: `Home - ${settings.conferenceName} - Reactive todo app`
};

tasksProvider();

const Page = async () => <HomePage defaultTasks={await firstValueFrom(tasksQuery$())} />;

export default Page;
