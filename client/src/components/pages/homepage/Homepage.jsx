import React, { useState, useEffect } from "react";
import LogoutButton from "./LogoutButton";
import Timer from "../../timer/Timer";
import SettingsModal from "../../settingsModal/SettingsModal";
import HistoryModal from "../../historyModal/HistoryModal";
import TodoList from "../../todos/TodoList";
import Navbar from "../../navbar/Navbar";
import { toast, Bounce, ToastContainer } from "react-toastify";

const Homepage = (props) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(20);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [numIntervals, setNumIntervals] = useState(4);

  useEffect(() => {
    if (props.isAuthenticated) {
      toast.success("Successfully Logged In", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else if (!props.isAuthenticated) {
      toast.success("Logged Out", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, [props.isAuthenticated]);

  return (
    <div className="homepage-container">
      <SettingsModal
        showModal={showSettingsModal}
        closeModal={() => {
          setShowSettingsModal(false);
        }}
        workMinutes={workMinutes}
        setWorkMinutes={setWorkMinutes}
        breakMinutes={breakMinutes}
        setBreakMinutes={setBreakMinutes}
        longBreakMinutes={longBreakMinutes}
        setLongBreakMinutes={setLongBreakMinutes}
        numIntervals={numIntervals}
        setNumIntervals={setNumIntervals}
      ></SettingsModal>
      <HistoryModal
        showModal={showHistoryModal}
        closeModal={() => {
          setShowHistoryModal(false);
        }}
      ></HistoryModal>

      <div className="non-modal-content">
        <Navbar
          isAuthenticated={props.isAuthenticated}
          setShowSettingsModal={setShowSettingsModal}
          setAuth={props.setAuth}
          setShowHistoryModal={setShowHistoryModal}
        ></Navbar>
        <div className="homepage-timer-container">
          <Timer
            setShowSettingsModal={setShowSettingsModal}
            workMinutes={workMinutes}
            breakMinutes={breakMinutes}
            longBreakMinutes={longBreakMinutes}
            numIntervals={numIntervals}
            isAuthenticated={props.isAuthenticated}
          ></Timer>
        </div>
        <div className="homepage-todo-list-container">
          <TodoList isAuthenticated={props.isAuthenticated}></TodoList>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
