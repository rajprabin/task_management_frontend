import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { login } from "../store/authSlice";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

function Login() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Perform login API call here
        dispatch(login({ username: values.username }));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <BootstrapForm.Group>
            <BootstrapForm.Label>Username</BootstrapForm.Label>
            <Field
              name="username"
              as={BootstrapForm.Control}
              isInvalid={touched.username && errors.username}
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {errors.username}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <BootstrapForm.Group>
            <BootstrapForm.Label>Password</BootstrapForm.Label>
            <Field
              name="password"
              type="password"
              as={BootstrapForm.Control}
              isInvalid={touched.password && errors.password}
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {errors.password}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="mt-3"
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
