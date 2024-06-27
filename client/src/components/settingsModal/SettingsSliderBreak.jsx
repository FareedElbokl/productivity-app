import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function SettingsSliderBreak(props) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={props.breakMinutes}
        onChange={(e, newValue) => props.setBreakMinutes(newValue)}
        min={1}
        max={120}
        aria-label="Default"
        valueLabelDisplay="auto"
        sx={{
          color: "#4aec8c", // This sets the color of the thumb, track and backgroundColor to red
          "& .MuiSlider-thumb": {
            backgroundColor: "#4aec8c", // Thumb color
          },
          "& .MuiSlider-track": {
            backgroundColor: "#4aec8c", // Track color
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#4aec8c", // Optional: change the rail color if needed
          },
        }}
      />
    </Box>
  );
}
