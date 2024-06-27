import React, { useState, useEffect } from "react";
import TodoTask from "./TodoTask";

const TodoList = (props) => {
  const [inputText, setInputText] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  async function getTasksFromDatabase() {
    //get tasks from db and store them in state var
    try {
      const response = await fetch("http://localhost:3000/todos/all", {
        headers: { token: localStorage.token },
      });

      if (!response.ok) {
        throw new Error("Failed to get tasks from server");
      }

      const data = await response.json(); //'data' stores an array of objects in this form:
      /*
      {
        "todo_id": 15,
        "user_id": "74320f3c-c864-401c-a206-e977aa6ebeeb",
        "task": "Sample todo.",
        "is_completed": false,
        "created_at": "2024-06-23T22:49:23.929Z",
        "updated_at": "2024-06-23T22:49:23.929Z"
      }
      */

      setTasks(data); // Update the tasks state with the fetched data
    } catch (error) {
      console.error(error.message);
    }

    return;
  }

  async function addTask() {
    if (props.isAuthenticated) {
      //1 make the api call to create the new task row in the db (if user auth'd)
      try {
        const task = inputText;
        const body = { task };

        const response = await fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error("Failed to post todo data");
        }
      } catch (error) {
        console.error(error.message);
      }

      //2 (if user auth'd) then we need to get hold of all tasks from db and update state var w them
      getTasksFromDatabase();
      return;
    }

    //3 if not authenticated, then simply add the task to state var
    //the task id will jus be the length of the array + 1
    if (inputText != "") {
      setTasks((prevTasks) => {
        return [...prevTasks, { task: inputText, todo_id: tasks.length + 1 }];
      });
    }

    setInputText("");
  }

  async function deleteTask(id) {
    if (props.isAuthenticated) {
      //1: make the api call to delete the task from db (if user auth'd)
      try {
        const response = await fetch(`http://localhost:3000/todos/item/${id}`, {
          method: "DELETE",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }
      } catch (error) {
        console.error(error.message);
      }

      //2 (if user auth'd) then we need to get hold of all tasks from db and update state var w them
      getTasksFromDatabase();
      return;
    }

    //3 if not auth, jus delete from state var
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => {
        return task.todo_id != id;
      });
    });
  }

  async function deleteAllTasks() {
    //1 Make the api call to delete all tasks from db (if user auth'd)
    if (props.isAuthenticated) {
      try {
        const response = await fetch("http://localhost:3000/todos/all", {
          method: "DELETE",
          headers: {
            token: localStorage.token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete all todo tasks");
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    //2 if not auth'd, then delete them from state variable
    setTasks([]);
  }

  //everytime login status changes or page refreshes, get tasks from db if were logged in.
  useEffect(() => {
    if (props.isAuthenticated) {
      //if weve logged in
      console.log("fetching tasks");
      getTasksFromDatabase();
    } else {
      setTasks([]); //if weve logged out, empty the tasks state var
    }
  }, [props.isAuthenticated]);

  const styleIfEmpty = { backgroundColor: "#d4d4ce" };

  return (
    <div className="todo-container">
      <h1 className="tasks-heading">Tasks</h1>
      <div className="input-container">
        <input
          type="text"
          className="task-input"
          onChange={handleInputChange}
          value={inputText}
          placeholder="Add task here"
        />
        <div className="button-group">
          <button className="with-text timer-btn task-btn" onClick={addTask}>
            Add Task
          </button>
          <button
            className="with-text timer-btn task-btn"
            onClick={deleteAllTasks}
          >
            Remove All
          </button>
        </div>
      </div>
      <div
        style={tasks.length == 0 ? styleIfEmpty : null}
        className="task-container"
      >
        {tasks.map((task) => {
          return (
            <TodoTask
              key={task.todo_id}
              taskId={task.todo_id}
              taskName={task.task}
              deleteTaskFn={deleteTask}
            ></TodoTask>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
