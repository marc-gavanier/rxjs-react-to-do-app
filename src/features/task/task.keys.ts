import { key } from 'piqure';
import { Observable } from 'rxjs';
import { Task } from './domain';

export const TASKS$ = key<Observable<Task[]>>('Tasks');
