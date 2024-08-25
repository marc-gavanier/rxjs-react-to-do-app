import { Subject } from 'rxjs';
import { TaskCategory } from '../task-category';

export const filterByCategoryAction = (filterByCategorySubject$: Subject<TaskCategory>) => (taskCategory: TaskCategory) =>
  filterByCategorySubject$.next(taskCategory);
