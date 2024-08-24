'use client';

import { Badge, ListGroup } from 'react-bootstrap';
import { Task } from '@/features/tasks/Task';

type TaskListItemProps = Task;

export const TaskListItem = ({ id, description, category, dueDate, checked }: TaskListItemProps) => (
  <ListGroup.Item className='d-flex shadow-sm'>
    <input className='form-check-input my-auto' defaultChecked={checked} type='checkbox' value='' id={`task-${id}`} />
    <label className='form-check-label d-flex flex-grow-1 ps-2 py-1 pe-2 align-items-center' htmlFor={`task-${id}`}>
      <span className='me-2'>{category.emoji}</span>
      {description}
    </label>
    <Badge className='py-2' bg='light' text='muted'>
      <span className='ri-time-line ri-lg' aria-hidden /> {dueDate.toDateString()}
    </Badge>
  </ListGroup.Item>
);
