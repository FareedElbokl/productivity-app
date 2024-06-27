import React from "react";

const HistorySession = (props) => {
  const style = { fontWeight: "bold" };
  return (
    <div className="session-and-del-button-holder">
      <div className="session-holder">
        <div className="session-date-container">
          <div className="date-label">Date</div>
          <div className="date-value-container" style={style}>
            {props.date.split("T")[0]}
          </div>
        </div>
        <div className="session-length-container">
          <div className="length-label">Length</div>
          <div className="length-value-container" style={style}>
            {props.length + " minute(s)"}
          </div>
        </div>
      </div>
      <button
        className="task-delete-btn session-delete-btn"
        onClick={() => {
          props.deleteSessionFn(props.session_id);
        }}
      >
        Remove
      </button>
    </div>
  );
};

export default HistorySession;
