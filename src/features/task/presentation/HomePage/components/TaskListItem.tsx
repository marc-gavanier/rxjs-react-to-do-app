'use client';

import { Badge, ListGroup } from 'react-bootstrap';
import { markAsDone, Task } from '@/features/task/domain';

export const TaskListItem = ({ id, description, emoji, dueDate, isDone }: Task) => (
  <ListGroup.Item className='d-flex shadow-sm'>
    <input
      className='form-check-input my-auto'
      defaultChecked={isDone}
      onClick={() => markAsDone(id)}
      type='checkbox'
      value=''
      id={`task-${id}`}
    />
    <label className='form-check-label d-flex flex-grow-1 ps-2 py-1 pe-2 align-items-center' htmlFor={`task-${id}`}>
      <span className='me-2'>{emoji}</span>
      {description}
    </label>
    <Badge className='py-2' bg='light' text='muted'>
      <span className='ri-time-line ri-lg' aria-hidden /> {dueDate.toDateString()}
    </Badge>
  </ListGroup.Item>
);
