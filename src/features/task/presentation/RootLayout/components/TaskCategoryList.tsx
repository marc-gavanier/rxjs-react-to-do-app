import { ListGroup } from 'react-bootstrap';
import { TaskCategory } from '@/features/task/domain';
import { TaskCategoryItem } from './TaskCategoryItem';

export const TaskCategoryList = ({ tasksCategories }: { tasksCategories: TaskCategory[] }) =>
  tasksCategories.length > 0 && (
    <ListGroup>
      {tasksCategories.map((taskCategory) => (
        <TaskCategoryItem key={`${taskCategory.emoji} ${taskCategory.name}`} {...taskCategory} />
      ))}
    </ListGroup>
  );
