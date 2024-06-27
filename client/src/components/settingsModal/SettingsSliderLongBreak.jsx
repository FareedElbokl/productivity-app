import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function SettingsSliderLongBreak(props) {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={props.longBreakMinutes}
        onChange={(e, newValue) => props.setLongBreakMinutes(newValue)}
        min={1}
        max={120}
        aria-label="Default"
        valueLabelDisplay="auto"
        sx={{
          color: "#6495ED", // This sets the color of the thumb, track and backgroundColor to red
          "& .MuiSlider-thumb": {
            backgroundColor: "#6495ED", // Thumb color
          },
          "& .MuiSlider-track": {
            backgroundColor: "#6495ED", // Track color
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#6495ED", // Optional: change the rail color if needed
          },
        }}
      />
    </Box>
  );
}
