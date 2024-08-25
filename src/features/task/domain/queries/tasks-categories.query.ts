import { inject } from '@/inject';
import { TASKS_CATEGORIES$ } from '@/features/task/task.keys';
import { combineLatest, map, startWith, switchMap } from 'rxjs';
import { filterByTaskCategory$, TaskCategory } from '../index';

const EMPTY_TASK_CATEGORY_FILTER = undefined;

const toToggledBy = (filterCategory?: TaskCategory) => (category: TaskCategory) =>
  category.id === filterCategory?.id ? { ...category, isActive: !filterCategory.isActive } : category;

export const tasksCategoriesQuery$ = () =>
  inject(TASKS_CATEGORIES$).pipe(
    switchMap((taskCategories: TaskCategory[]) =>
      combineLatest([filterByTaskCategory$.pipe(startWith(EMPTY_TASK_CATEGORY_FILTER))]).pipe(
        map(([taskCategoryFilter]: [TaskCategory | undefined]): TaskCategory[] =>
          taskCategories.map(toToggledBy(taskCategoryFilter))
        )
      )
    )
  );
