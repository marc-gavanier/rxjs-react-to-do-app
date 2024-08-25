import { Subject } from 'rxjs';

export const markAsDoneAction = (markAsDoneSubject$: Subject<string>) => (taskId: string) => markAsDoneSubject$.next(taskId);
