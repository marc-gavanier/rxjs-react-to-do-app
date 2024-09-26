import { combineLatest, map, Observable, startWith, switchMap } from 'rxjs';
import { inject } from '@/inject';
import { TASKS$ } from '@/features/task/task.keys';
import { filterByTaskCategory$ } from '../actions';
import { onlyRemainingTasks, Task } from '../task';
import { TaskCategory, toMergeTaskCategories, toToggledBy } from '../task-category';
import { tasks$ } from './tasks.query';

const toToggledTaskCategory = ([selectedTaskCategory, taskCategories]: [
  TaskCategory | undefined,
  TaskCategory[]
]): TaskCategory[] => taskCategories.map(toToggledBy(selectedTaskCategory));

const fromTasksToTaskCategories = ([selectedTaskCategory, tasks]: [TaskCategory | undefined, Task[]]): [
  TaskCategory | undefined,
  TaskCategory[]
] => [selectedTaskCategory, tasks.filter(onlyRemainingTasks).reduce(toMergeTaskCategories, [])];

export const tasksCategoriesQuery$ = (): Observable<TaskCategory[]> =>
  inject(TASKS$).pipe(
    switchMap((initialTasks: Task[]) =>
      combineLatest([filterByTaskCategory$.pipe(startWith(undefined)), tasks$.pipe(startWith(initialTasks))]).pipe(
        map(fromTasksToTaskCategories),
        map(toToggledTaskCategory)
      )
    )
  );
