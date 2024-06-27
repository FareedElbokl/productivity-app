import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function SettingsSliderWork(props) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={props.workMinutes}
        onChange={(e, newValue) => props.setWorkMinutes(newValue)}
        min={1}
        max={120}
        aria-label="Default"
        valueLabelDisplay="auto"
        sx={{
          color: "#f54e4e", // This sets the color of the thumb, track and backgroundColor to red
          "& .MuiSlider-thumb": {
            backgroundColor: "#f54e4e", // Thumb color
          },
          "& .MuiSlider-track": {
            backgroundColor: "#f54e4e", // Track color
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#f54e4e", // Optional: change the rail color if needed
          },
        }}
      />
    </Box>
  );
}
