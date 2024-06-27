import React from "react";

const TodoTask = (props) => {
  return (
    <div className="task-holder">
      <div className="task">
        <span>{props.taskName}</span>
      </div>
      <button
        className="task-delete-btn"
        onClick={() => {
          props.deleteTaskFn(props.taskId);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default TodoTask;
