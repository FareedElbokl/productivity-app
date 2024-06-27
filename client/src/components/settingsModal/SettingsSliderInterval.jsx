import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
const SettingsSliderInterval = (props) => {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={props.numIntervals}
        onChange={(e, newValue) => props.setNumIntervals(newValue)}
        min={1}
        max={10}
        aria-label="Default"
        valueLabelDisplay="auto"
        sx={{
          color: "#F1B758", // This sets the color of the thumb, track and backgroundColor to red
          "& .MuiSlider-thumb": {
            backgroundColor: "#F1B758", // Thumb color
          },
          "& .MuiSlider-track": {
            backgroundColor: "#F1B758", // Track color
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#F1B758", // Optional: change the rail color if needed
          },
        }}
      />
    </Box>
  );
};

export default SettingsSliderInterval;
