import { BehaviorSubject, combineLatest, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs';
import { inject } from '@/inject';
import { TASKS$ } from '@/features/task/task.keys';
import { filterByTaskCategory$, markAsDone$ } from '../actions';
import { byCategory, onlyRemainingTasks, markTaskAsDone, Task } from '../task';
import { TaskCategory } from '../task-category';

type FilteringTasks = [Task[], TaskCategory | undefined];

const tasksSubject$ = new BehaviorSubject<Task[]>([]);

export const tasks$ = tasksSubject$.asObservable();

const toFilteringTasks = ([[markAsDoneId, taskCategoryFilter], tasks]: [
  Partial<[string, TaskCategory]>,
  Task[]
]): FilteringTasks => [tasks.map(markTaskAsDone(markAsDoneId)), taskCategoryFilter];

const memorizeUpdatedTasks = ([updatedTasks]: FilteringTasks): void => tasksSubject$.next(updatedTasks);

const toFilteredTasks = ([updatedTasks, categoryFilter]: FilteringTasks): Task[] =>
  updatedTasks.filter(byCategory(categoryFilter)).filter(onlyRemainingTasks);

export const tasksQuery$ = () =>
  inject(TASKS$).pipe(
    tap(tasksSubject$.next.bind(tasksSubject$)),
    switchMap(() =>
      combineLatest([markAsDone$.pipe(startWith(undefined)), filterByTaskCategory$.pipe(startWith(undefined))]).pipe(
        withLatestFrom(tasksSubject$),
        map(toFilteringTasks),
        tap(memorizeUpdatedTasks),
        map(toFilteredTasks)
      )
    )
  );
