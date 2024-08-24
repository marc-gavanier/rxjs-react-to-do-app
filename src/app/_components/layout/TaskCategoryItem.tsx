'use client';

import { Badge, ListGroup } from 'react-bootstrap';
import { TaskCategory } from '@/features/tasks/TaskCategory';

type TaskCategoryItemProps = TaskCategory;

export const TaskCategoryItem = ({ name, emoji, taskCount, isActive }: TaskCategoryItemProps) => (
  <ListGroup.Item action active={isActive} className='d-flex justify-content-between'>
    {emoji} {name}
    <Badge pill bg='light' text='dark'>
      {taskCount}
    </Badge>
  </ListGroup.Item>
);
