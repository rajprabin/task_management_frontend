import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchTasks } from "./store/tasksSlice";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import SearchBar from "./components/SearchBar";
import Notification from "./components/Notification";
import Login from "./components/Login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Router>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand href="/">Task Manager</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/new">New Task</Nav.Link>
          </Nav>
          <SearchBar />
        </Container>
      </Navbar>
      <Container>
        <Notification />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
