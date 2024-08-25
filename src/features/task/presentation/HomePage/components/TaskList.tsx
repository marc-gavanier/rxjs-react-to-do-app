import { ListGroup } from 'react-bootstrap';
import { Task } from '@/features/task/domain';
import { TaskListItem } from './TaskListItem';

export const TaskList = ({ tasks }: { tasks: Task[] }) =>
  tasks.length > 0 ? (
    <ListGroup>
      {tasks.map((task) => (
        <TaskListItem {...task} key={task.id} />
      ))}
    </ListGroup>
  ) : (
    <div className='display-4 text-center py-5'>Task list is empty ! 🎉</div>
  );
