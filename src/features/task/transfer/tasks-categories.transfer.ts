import { map, Observable, of } from 'rxjs';
import tasksJson from '@/data/tasks.json';
import { Task, TaskCategory } from '@/features/task/domain';
import { TaskTransfer, toTaskFromTransfer } from './task.transfer';

const newTaskCategory = (index: number, { categoryName, emoji }: Task): TaskCategory => ({
  id: index.toString(),
  name: categoryName,
  emoji,
  taskCount: 1,
  isActive: false
});

const incrementTaskCount = (taskCategoryFound: TaskCategory): TaskCategory => ({
  ...taskCategoryFound,
  taskCount: taskCategoryFound.taskCount + 1
});

const onlySameCategory =
  ({ categoryName, emoji }: Task) =>
  (taskCategory: TaskCategory): boolean =>
    taskCategory.name === categoryName && taskCategory.emoji === emoji;

const exceptSameCategory =
  (task: Task) =>
  (taskCategory: TaskCategory): boolean =>
    !onlySameCategory(task)(taskCategory);

export const mergeTaskCategories = (
  taskCategories: TaskCategory[],
  index: number,
  task: Task,
  taskCategoryFound?: TaskCategory
) =>
  taskCategoryFound == null
    ? [...taskCategories, newTaskCategory(index, task)]
    : [...taskCategories.filter(exceptSameCategory(task)), incrementTaskCount(taskCategoryFound)];

export const toTaskCategoriesFromTasks = (
  taskCategories: TaskCategory[],
  taskTransfer: TaskTransfer,
  index: number
): TaskCategory[] => {
  const task: Task = toTaskFromTransfer(taskTransfer);
  return mergeTaskCategories(taskCategories, index, task, taskCategories.find(onlySameCategory(task)));
};

export const tasksCategoriesTransfer$: Observable<TaskCategory[]> = of(tasksJson).pipe(
  map((tasksCategories): TaskCategory[] =>
    tasksCategories.reduce((taskCategories: TaskCategory[], taskTransfer: TaskTransfer, index: number): TaskCategory[] => {
      const task: Task = toTaskFromTransfer(taskTransfer);
      return mergeTaskCategories(taskCategories, index, task, taskCategories.find(onlySameCategory(task)));
    }, [])
  )
);
