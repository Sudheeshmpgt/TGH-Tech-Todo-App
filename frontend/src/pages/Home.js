import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { TodoForm } from "../components/modal/TodoForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RestService } from "../rest";
import Toast from "../components/sweetAlert/sweetAlert";
import Swal from "sweetalert2";

export let HomePage = () => {
  let navigate = useNavigate();
  const [todoFormState, setTodoFormState] = useState(false);
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [completeCount, setCompletedCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [pending, setPending] = useState([]);

  let loadData = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      const result = await RestService.getAllTodo(token);
      setTasks(result.todos);
      const count = await RestService.countTodo(token);
      setCompletedCount(count.completed);
      setCancelledCount(count.cancelled);
      setPendingCount(count.pending);
      const list = await RestService.todoListByStatus(token);
      setCompleted(list.completed);
      setCancelled(list.cancelled);
      setPending(list.pending);
    }
  };

  let handleStatus = (status, todoId) => {
    let body = {
      todoId,
      status,
    };
    RestService.updateTodoStatus(body, accessToken)
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: res?.message,
        });
        loadData();
      })
      .catch((error) => {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "Todo status updation failed",
        });
      });
  };

  let handleDelete = (todoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        RestService.deleteTodo(todoId, accessToken)
          .then((res) => {
            loadData();
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire("Deleted!", "Todo has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    if (!token) {
      navigate("/");
    }
    if (token) {
      setAccessToken(token);
      loadData();
    }
  }, []);

  let handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card
              className="bg-secondary"
              style={{
                width: "38rem",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "10%",
              }}
            >
              <Card.Body>
                <Card.Title className="text-center text-white font-weight-bold mt-2 mb-2">
                  <h4>{`Welcome, ${user?.name}`}</h4>
                </Card.Title>
                <div style={{ width: "120px", marginLeft: "auto" }}>
                  <div
                    onClick={handleLogout}
                    className="btn btn-primary btn-sm"
                  >
                    Logout
                  </div>
                </div>
                <Card.Text className="text-white d-flex justify-content-between mt-4">
                  <h5>Your Tasks</h5>
                  <div
                    className="btn btn-info btn-sm"
                    onClick={() => setTodoFormState(true)}
                  >
                    Create new todo
                  </div>
                </Card.Text>
                {tasks.length ? (
                  tasks.map((task, index) => (
                    <Row key={index}>
                      <Col md={9}>
                        <div className="bg-light rounded mb-2">
                          <div className="d-flex p-2" style={{ width: "100%" }}>
                            <div>{`${index + 1}. `}</div>
                            <div
                              style={{ marginLeft: "10px" }}
                            >{`${task.text}`}</div>
                            <div
                              style={{ marginLeft: "10px" }}
                            >{`(${task.priority})`}</div>
                            <div style={{ marginLeft: "10px" }}>
                              [
                              {task.status == "completed" ? (
                                <i className="fa fa-check me-2 text-success" />
                              ) : task.status == "cancelled" ? (
                                <i className="fa fa-close me-2 text-danger" />
                              ) : (
                                " "
                              )}
                              ]
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={3} className="d-flex">
                        <div
                          className="btn bg-success text-white"
                          style={{
                            marginRight: "5px",
                            width: "40px",
                            height: "40px",
                          }}
                          onClick={() => handleStatus("completed", task?._id)}
                        >
                          <i className="fa fa-check me-2" />
                        </div>
                        <div
                          className="btn bg-primary text-white"
                          style={{
                            marginRight: "5px",
                            width: "40px",
                            height: "40px",
                          }}
                          onClick={() => handleStatus("cancelled", task?._id)}
                        >
                          <i className="fa fa-close me-2" />
                        </div>
                        <div
                          className="btn bg-danger text-white"
                          style={{
                            marginRight: "5px",
                            width: "40px",
                            height: "40px",
                          }}
                          onClick={() => handleDelete(task?._id)}
                        >
                          <i className="fa fa-trash me-2" />
                        </div>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <div className="bg-light rounded mb-2 p-2 text-center">
                    <div>No Todos Found</div>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Row>
              <Card
                className="bg-secondary"
                style={{
                  width: "39rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "10%",
                }}
              >
                <Card.Body>
                  <Row>
                    <Col className="text-center">
                      <div>
                        <h5 className="text-white border-bottom text-center">
                          Completed Todos
                        </h5>
                      </div>
                      <div
                        className="text-white"
                        style={{ fontSize: "1.3rem", fontWeight: "500" }}
                      >
                        {completeCount}
                      </div>
                    </Col>
                    <Col className="text-center">
                      <div>
                        <h5 className="text-white border-bottom text-center">
                          Cancelled Todos
                        </h5>
                      </div>
                      <div
                        className="text-white"
                        style={{ fontSize: "1.3rem", fontWeight: "500" }}
                      >
                        {cancelledCount}
                      </div>
                    </Col>
                    <Col className="text-center">
                      <div>
                        <h5 className="text-white border-bottom text-center">
                          Pending Todos
                        </h5>
                      </div>
                      <div
                        className="text-white"
                        style={{ fontSize: "1.3rem", fontWeight: "500" }}
                      >
                        {pendingCount}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <Row>
              <Col>
                <Card
                  className="bg-secondary"
                  style={{
                    width: "18rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "10%",
                  }}
                >
                  <Card.Body>
                    <div>
                      <h5 className="text-white border-bottom text-center">
                        Completed Todos List
                      </h5>
                    </div>
                    <div>
                      {completed.length ? (
                        completed.map((c, index) => (
                          <div className="bg-light rounded mb-2">
                            <div
                              className="d-flex p-2"
                              style={{ width: "100%" }}
                            >
                              <div>{`${index + 1}. `}</div>
                              <div
                                style={{ marginLeft: "10px" }}
                              >{`${c?.text}`}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-white">No Todos found</div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  className="bg-secondary"
                  style={{
                    width: "18rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "10%",
                  }}
                >
                  <Card.Body>
                    <div>
                      <h5 className="text-white border-bottom text-center">
                        Cancelled Todos List
                      </h5>
                    </div>
                    <div>
                      {cancelled.length ? (
                        cancelled.map((c, index) => (
                          <div className="bg-light rounded mb-2">
                            <div
                              className="d-flex p-2"
                              style={{ width: "100%" }}
                            >
                              <div>{`${index + 1}. `}</div>
                              <div
                                style={{ marginLeft: "10px" }}
                              >{`${c?.text}`}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-white">No Todos found</div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  className="bg-secondary"
                  style={{
                    width: "18rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "10%",
                  }}
                >
                  <Card.Body>
                    <div>
                      <h5 className="text-white border-bottom text-center">
                        Pending Todos List
                      </h5>
                    </div>
                    <div>
                      {pending.length ? (
                        pending.map((c, index) => (
                          <div className="bg-light rounded mb-2">
                            <div
                              className="d-flex p-2"
                              style={{ width: "100%" }}
                            >
                              <div>{`${index + 1}. `}</div>
                              <div
                                style={{ marginLeft: "10px" }}
                              >{`${c?.text}`}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-white">No Todos found</div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <TodoForm
        show={todoFormState}
        handleClose={(changes) => {
          if (changes) {
            loadData();
          }
          setTodoFormState(false);
        }}
      />
    </>
  );
};
