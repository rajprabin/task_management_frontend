import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { addTask } from "../store/tasksSlice";
import { clearNotification, setNotification } from "../store/notificationSlice";
import { useNavigate } from "react-router-dom";

const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string(),
  dueDate: Yup.date(),
  status: Yup.string().oneOf(["pending", "in_progress", "completed"]),
});

function TaskForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
      }}
      validationSchema={TaskSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(addTask(values));
        dispatch(
          setNotification({
            message: "Task created successfully",
            type: "success",
          })
        );
        navigate("/");

        setTimeout(() => dispatch(clearNotification()), 5000);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <BootstrapForm.Group>
            <BootstrapForm.Label>Title</BootstrapForm.Label>
            <Field
              name="title"
              as={BootstrapForm.Control}
              isInvalid={touched.title && errors.title}
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {errors.title}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <BootstrapForm.Group>
            <BootstrapForm.Label>Description</BootstrapForm.Label>
            <Field name="description" as={BootstrapForm.Control} />
          </BootstrapForm.Group>

          <BootstrapForm.Group>
            <BootstrapForm.Label>Due Date</BootstrapForm.Label>
            <Field name="dueDate" type="date" as={BootstrapForm.Control} />
          </BootstrapForm.Group>

          <BootstrapForm.Group>
            <BootstrapForm.Label>Status</BootstrapForm.Label>
            <Field name="status" as="select" className="form-control">
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </Field>
          </BootstrapForm.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="mt-3"
          >
            Create Task
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default TaskForm;
