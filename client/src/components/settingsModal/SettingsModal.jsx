import React, { useContext } from "react";
import SettingsSliderWork from "./SettingsSliderWork";
import SettingsSliderBreak from "./SettingsSliderBreak";
import SettingsSliderLongBreak from "./SettingsSliderLongBreak";
import SettingsSliderInterval from "./SettingsSliderInterval";
import BackButton from "./BackButton";

const SettingsModal = (props) => {
  if (!props.showModal) {
    return null;
  }

  // Close modal if clicked outside the content
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      props.closeModal();
    }
  };
  return (
    <div className="settings-modal-overlay" onClick={handleOverlayClick}>
      <div className="settings-modal-container" style={{ textAlign: "left" }}>
        <div style={{ paddingTop: "10px" }}>
          <label className="work-minutes-label">
            work minutes: {props.workMinutes}{" "}
          </label>
          <SettingsSliderWork
            workMinutes={props.workMinutes}
            setWorkMinutes={props.setWorkMinutes}
          ></SettingsSliderWork>
          <label className="break-minutes-label">
            break minutes: {props.breakMinutes}
          </label>
          <SettingsSliderBreak
            breakMinutes={props.breakMinutes}
            setBreakMinutes={props.setBreakMinutes}
          ></SettingsSliderBreak>
          <label className="long-break-minutes-label">
            Long break minutes: {props.longBreakMinutes}
          </label>
          <SettingsSliderLongBreak
            longBreakMinutes={props.longBreakMinutes}
            setLongBreakMinutes={props.setLongBreakMinutes}
          ></SettingsSliderLongBreak>
          <label className="intervals-label">
            Intervals: {props.numIntervals}
          </label>
          <SettingsSliderInterval
            numIntervals={props.numIntervals}
            setNumIntervals={props.setNumIntervals}
          ></SettingsSliderInterval>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <BackButton
            onClick={(e) => {
              props.closeModal();
            }}
          ></BackButton>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
