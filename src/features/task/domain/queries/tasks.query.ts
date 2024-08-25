import { BehaviorSubject, combineLatest, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs';
import { inject } from '@/inject';
import { TASKS$ } from '@/features/task/task.keys';
import { filterByTaskCategory$, markAsDone$ } from '../actions';
import { Task } from '../task';
import { TaskCategory } from '../task-category';

type FilteringTasks = [Task[], TaskCategory | undefined];

const tasksSubject$ = new BehaviorSubject<Task[]>([]);

const shouldFilterWith = (categoryFilter?: TaskCategory) => categoryFilter != null && !categoryFilter.isActive;

const byCategory = (categoryFilter?: TaskCategory) => (task: Task) =>
  shouldFilterWith(categoryFilter) ? categoryFilter?.emoji === task.emoji && categoryFilter?.name === task.categoryName : true;

const byTodoState = (task: Task) => !task.isDone;

const markTaskAsDone = (markAsDoneId?: string) => (task: Task) => (task.id === markAsDoneId ? { ...task, isDone: true } : task);

const toFilteringTasks = ([[markAsDoneId, taskCategoryFilter], tasks]: [
  Partial<[string, TaskCategory]>,
  Task[]
]): FilteringTasks => [tasks.map(markTaskAsDone(markAsDoneId)), taskCategoryFilter];

const memorizeUpdatedTasks = ([updatedTasks]: FilteringTasks): void => tasksSubject$.next(updatedTasks);

const toFilteredTasks = ([updatedTasks, categoryFilter]: FilteringTasks): Task[] =>
  updatedTasks.filter(byCategory(categoryFilter)).filter(byTodoState);

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
