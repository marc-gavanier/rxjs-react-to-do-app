import { Observable, Subject } from 'rxjs';
import { TaskCategory } from '../task-category';
import { filterByCategoryAction } from './filter-by-category.action';
import { markAsDoneAction } from './mark-as-done.action';

const filterByCategorySubject$: Subject<TaskCategory> = new Subject<TaskCategory>();

export const filterByTaskCategory$: Observable<TaskCategory> = filterByCategorySubject$.asObservable();

export const filterByCategory = filterByCategoryAction(filterByCategorySubject$);

const markAsDoneSubject$: Subject<string> = new Subject<string>();

export const markAsDone$: Observable<string> = markAsDoneSubject$.asObservable();

export const markAsDone = markAsDoneAction(markAsDoneSubject$);
