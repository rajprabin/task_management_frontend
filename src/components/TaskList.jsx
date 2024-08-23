import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { clearNotification, setNotification } from "../store/notificationSlice";
import { useDispatch } from "react-redux";

function TaskList() {
  const tasks = useSelector((state) => state.tasks.items);
  const status = useSelector((state) => state.tasks.status);
  const dispatch = useDispatch();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading tasks</div>;

  setTimeout(() => {
    const now = new Date();
    const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const dueTasks = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate > now && dueDate < nextDay;
    });

    if (dueTasks.length > 0) {
      dispatch(
        setNotification({
          message: `You have ${dueTasks.length} task(s) due today`,
          type: "warning",
        })
      );
    } else {
      dispatch(clearNotification());
    }
  }, 1000);

  return (
    <ListGroup>
      {tasks.map((task) => (
        <ListGroup.Item
          key={task.id}
          className="d-flex justify-content-between gap-2 flex-wrap flex-md-nowrap"
        >
          <Link to={`/task/${task.id}`}>{task.title}</Link>

          <span
            className={`float-right ${
              task.status === "completed"
                ? "btn btn-success"
                : task.status === "in_progress"
                ? "btn btn-warning"
                : "btn btn-danger"
            }`}
          >
            {task.status === "completed"
              ? "Completed"
              : task.status === "in_progress"
              ? "In Progress"
              : "Pending"}
          </span>

          <span className="text-primary">{task.dueDate}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TaskList;
