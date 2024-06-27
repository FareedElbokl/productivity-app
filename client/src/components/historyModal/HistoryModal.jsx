import React, { useEffect, useState } from "react";
import HistorySession from "./HistorySession";

const HistoryModal = (props) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //everytime modal is opened, get sessions from database
    if (props.showModal) {
      getSessionsFromDatabase();
    }
  }, [props.showModal]);

  async function getSessionsFromDatabase() {
    try {
      const response = await fetch("http://localhost:3000/session/all", {
        headers: { token: localStorage.token },
      });

      //if no sessions exist
      if (response.status === 404) {
        setSessions([]);
        setError("Error: No sessions found for this user");
      } else if (!response.ok) {
        throw new Error("Failed to get user's sessions from server");
      } else {
        const data = await response.json(); //'data' stores an array of objects in this form:
        /*
        [
            {
                "session_id": 12,
                "user_id": "74320f3c-c864-401c-a206-e977aa6ebeeb",
                "session_date": "2024-06-15T04:00:00.000Z",
                "duration_minutes": 1,
                "created_at": "2024-06-16T00:32:00.115Z"
            }
        ]
        */
        setSessions(data);
        setError(null);
      }
    } catch (error) {
      console.error(error.message);
      setError("An error occurred while fetching sessions");
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }

  async function deleteSession(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/session/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      //now update the sessions state var by getting them from db
      getSessionsFromDatabase();
    } catch (error) {
      console.error(error.message);
    }
  }

  // Close modal if clicked outside the content
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      props.closeModal();
    }
  };

  if (!props.showModal) {
    return null;
  }
  return (
    <div className="settings-modal-overlay" onClick={handleOverlayClick}>
      <div className="history-modal-container">
        <div className="history-header-container">
          <h1 className=" history-h1">History</h1>
        </div>
        <div className="session-container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            sessions.map((session) => (
              <HistorySession
                key={session.session_id}
                session_id={session.session_id}
                date={session.session_date}
                length={session.duration_minutes}
                deleteSessionFn={deleteSession}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
