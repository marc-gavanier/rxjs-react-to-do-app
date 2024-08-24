import { ListGroup } from 'react-bootstrap';
import { TaskCategory } from '@/features/tasks/TaskCategory';
import { TaskCategoryItem } from './TaskCategoryItem';

type TaskCategoryListProps = {
  tasksCategories: TaskCategory[];
};

export const TaskCategoryList = ({ tasksCategories }: TaskCategoryListProps) =>
  tasksCategories.length > 0 && (
    <ListGroup>
      {tasksCategories.map((taskCategory) => (
        <TaskCategoryItem key={taskCategory.id} {...taskCategory} />
      ))}
    </ListGroup>
  );
