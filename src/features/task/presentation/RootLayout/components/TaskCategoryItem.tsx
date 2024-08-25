'use client';

import { Badge, ListGroup } from 'react-bootstrap';
import { filterByCategory, TaskCategory } from '@/features/task/domain';

export const TaskCategoryItem = (category: TaskCategory) => (
  <ListGroup.Item
    action
    active={category.isActive}
    className='d-flex justify-content-between'
    onClick={() => filterByCategory(category)}>
    {category.emoji} {category.name}
    <Badge pill bg='light' text='dark'>
      {category.taskCount}
    </Badge>
  </ListGroup.Item>
);
