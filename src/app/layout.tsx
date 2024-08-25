import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { firstValueFrom } from 'rxjs';
import '@/styles/styles.scss';
import settings from '@/data/settings.json';
import { tasksCategoriesProvider } from '@/features/task';
import { tasksCategoriesQuery$ } from '@/features/task/domain';
import { RootLayout } from '@/features/task/presentation';

tasksCategoriesProvider();

export const metadata: Metadata = {
  title: `${settings.conferenceName} - Reactive todo app`
};

const Layout = async ({ children }: { children: ReactNode }) => {
  const defaultTaskCategories = await firstValueFrom(tasksCategoriesQuery$());
  return <RootLayout defaultTaskCategories={defaultTaskCategories}>{children}</RootLayout>;
};

export default Layout;
