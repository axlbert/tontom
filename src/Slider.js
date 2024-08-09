// Slider.js
import React from 'react';
import './Slider.css';

const Slider = ({ label, min, max, value, onChange }) => {
  return (
    <div className="slider-container">
      <label>{label}</label>
      <div className="slider-inputs">
        <button onClick={() => onChange(value - 1)} disabled={value <= min}>-</button>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider"
        />
        <button onClick={() => onChange(value + 1)} disabled={value >= max}>+</button>
      </div>
      <span>{value}</span>
    </div>
  );
};

export default Slider;
