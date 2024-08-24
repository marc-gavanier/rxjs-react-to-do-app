import { ListGroup } from 'react-bootstrap';
import { Task } from '@/features/tasks/Task';
import { TaskListItem } from './TaskListItem';

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) =>
  tasks.length > 0 ? (
    <ListGroup>
      {tasks.map((task) => (
        <TaskListItem {...task} key={task.id} />
      ))}
    </ListGroup>
  ) : (
    <div className='display-4 text-center py-5'>Task list is empty ! 🎉</div>
  );
