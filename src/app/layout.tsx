import { ReactNode } from 'react';
import type { Metadata } from 'next';
import '@/styles/styles.scss';
import settings from '@/data/settings.json';
import tasksCategories from '@/data/tasks-categories.json';
import { TaskCategoryList } from './_components/layout/TaskCategoryList';

export const metadata: Metadata = {
  title: `${settings.conferenceName} - Reactive todo app`
};

const RootLayout = ({
  children
}: Readonly<{
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
              <TaskCategoryList tasksCategories={tasksCategories} />
            </div>
          </aside>
        </div>
      </div>
    </body>
  </html>
);

export default RootLayout;
