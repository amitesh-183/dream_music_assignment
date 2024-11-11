import React from "react";

const CustomSlider = ({ value, onChange, peekValue }) => {
  return (
    <div className="slider-container">
      {peekValue && (
        <div className="peek-preview" style={{ left: `${peekValue}%` }} />
      )}
      <div className="slider-progress" style={{ width: `${value}%` }} />
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={onChange}
        className="custom-slider"
      />
    </div>
  );
};

export default CustomSlider;
