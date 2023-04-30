import React, { useState, useEffect } from "react";
import "./App.css";
import { BASE_URL } from "../constants/apiURL";
import { getCall, postCall, deleteCall } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import ListItem from "../components/ListItem/ListItem";
import InputBox from "../components/InputBox/InputBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../components/Modal/Modal";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const [todoText, setTodoText] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const onChangeTodoText = (e) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    let data = {
      content: todoText,
    };

    if (todoText || !todoText == "") {
      await postCall(`${BASE_URL}/todos/add`, data)
        .then((res) => {
          setIsLoading(false);
          console.log("response data addTodo ==>> ", res);
          toast(res?.data?.message, { type: "success" });
          setTodoText("");
          getData();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          toast(err?.message, { type: "error" });
        });
    } else {
      setIsLoading(false);
      return toast("Todo is empty! Please enter some text", { type: "info" });
    }
  };

  const getData = async () => {
    setIsLoading(true);

    await getCall(`${BASE_URL}/todos/getAllTodos`)
      .then((res) => {
        if (res?.status === 200) {
          setIsLoading(false);
          console.log("response data getAllTodos ==>> ", res);
          setTodos(res?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast(err?.message, { type: "error" });
      });
  };

  const handleDeleteClick = (item) => {
    console.log("item to delete ==>> ", item);
    setShowModal(true);
    setSelectedTodo(item);
  };

  const handleDeleteTodo = async () => {
    setShowModal(false);
    setIsLoading(true);
    if (selectedTodo != null) {
      await deleteCall(`${BASE_URL}/todos/delete/${selectedTodo?._id}`)
        .then((res) => {
          if (res?.status === 200) {
            setIsLoading(false);
            console.log("response data deleteTodo ==>> ", res);
            toast(res?.data?.message, { type: "success" });
            getData();
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          toast(err?.message, { type: "error" });
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mainDiv">
      <div className="headDiv">
        <h1 className="mainHeading">Todo List Web App</h1>
        <h3 className="subHeading">Made by: Abdul Basit Mehtab</h3>
      </div>

      <div className="inputDiv">
        <InputBox
          onChange={onChangeTodoText}
          onAddClick={() => handleSubmit()}
          value={todoText}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        todos.map((item, index) => {
          return (
            <ListItem
              key={item?._id}
              item={item}
              onDeleteClick={() => handleDeleteClick(item)}
            />
          );
        })
      )}

      <Modal
        show={showModal}
        title="Delete Todo"
        onClose={() => setShowModal(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ textAlign: "center" }}>
            Are you sure you want to delete this todo?
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <button
              className="yesBtn"
              onClick={() => {
                handleDeleteTodo();
              }}
            >
              Yes
            </button>

            <button
              className="noBtn"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              No
            </button>
          </div>
        </div>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default App;
