import { key } from 'piqure';
import { Observable } from 'rxjs';
import { Task, TaskCategory } from './domain';

export const TASKS_CATEGORIES$ = key<Observable<TaskCategory[]>>('Tasks categories');

export const TASKS$ = key<Observable<Task[]>>('Tasks');
