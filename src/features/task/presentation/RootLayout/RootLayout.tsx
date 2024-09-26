'use client';

import { ReactNode } from 'react';
import { Subscribe } from '@/reactivity/Subscribe';
import { tasksProvider } from '@/features/task';
import { TaskCategory, tasksCategoriesQuery$ } from '@/features/task/domain';
import { TaskCategoryList } from './components/TaskCategoryList';

tasksProvider();

export const RootLayout = ({
  defaultTaskCategories,
  children
}: Readonly<{
  defaultTaskCategories: TaskCategory[];
  children: ReactNode;
}>) => (
  <html lang='en'>
    <body>
      <div className='container-fluid bg-light'>
        <div className='row flex-row-reverse'>
          <div className='col vh-100 overflow-auto'>{children}</div>
          <aside className='col-auto p-2 vh-100'>
            <div
              className='bg-white rounded-3 h-100 overflow-auto shadow-sm py-5 px-3 d-lg-block d-none'
              style={{ width: '400px' }}>
              <h2 className='mb-4'>Task categories</h2>
              <Subscribe to$={tasksCategoriesQuery$()} startWith={defaultTaskCategories}>
                {({ value: taskCategories }: { value?: TaskCategory[] }) => (
                  <TaskCategoryList tasksCategories={taskCategories ?? []} />
                )}
              </Subscribe>
            </div>
          </aside>
        </div>
      </div>
    </body>
  </html>
);
