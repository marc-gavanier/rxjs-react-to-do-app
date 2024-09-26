import { Task } from './task';

export type TaskCategory = {
  name: string;
  emoji: string;
  taskCount: number;
  isActive: boolean;
};

export const toToggledBy =
  (filterCategory?: TaskCategory) =>
  (category: TaskCategory): TaskCategory =>
    category.name === filterCategory?.name && category.emoji === filterCategory?.emoji
      ? { ...category, isActive: !filterCategory.isActive }
      : category;

const newTaskCategory = ({ categoryName, emoji }: Task): TaskCategory => ({
  name: categoryName,
  emoji,
  taskCount: 1,
  isActive: false
});

const onlySameCategory =
  ({ categoryName, emoji }: Task) =>
  (taskCategory: TaskCategory): boolean =>
    taskCategory.name === categoryName && taskCategory.emoji === emoji;

const exceptSameCategory =
  (task: Task) =>
  (taskCategory: TaskCategory): boolean =>
    !onlySameCategory(task)(taskCategory);

const incrementTaskCount = (taskCategoryFound: TaskCategory): TaskCategory => ({
  ...taskCategoryFound,
  taskCount: taskCategoryFound.taskCount + 1
});

const newTaskCategoryOrIncrementTaskCount = (
  taskCategoryFound: TaskCategory | undefined,
  taskCategories: TaskCategory[],
  task: Task
) =>
  taskCategoryFound == null
    ? [...taskCategories, newTaskCategory(task)]
    : [...taskCategories.filter(exceptSameCategory(task)), incrementTaskCount(taskCategoryFound)];

export const toMergeTaskCategories = (taskCategories: TaskCategory[], task: Task): TaskCategory[] =>
  newTaskCategoryOrIncrementTaskCount(taskCategories.find(onlySameCategory(task)), taskCategories, task);
