import React, { useState, useEffect } from "react";

function Measurements({ setPortion }) {
  const [measurementValue, setMeasurementValue] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [showUnits, setShowUnits] = useState(false);

  useEffect(() => {
    setPortion(`${measurementValue} ${selectedUnit}`);
  }, [measurementValue, selectedUnit, setPortion]);

  const handleRadioChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMeasurementValue(value);
    setShowUnits(value !== ""); // Show units if there is a value
  };

  return (
    <div className="measurement-box">
      <input
        type="number"
        name="measurement-value"
        onChange={handleInputChange}
        className="measurement-input"
      />
      <br />
      {showUnits && (
        <div className="radios">
          <div className="radio-option">
            <input
              type="radio"
              id="ml"
              name="measurement"
              value="ml"
              checked={selectedUnit === "ml"}
              onChange={handleRadioChange}
            />
            <label htmlFor="ml">ml</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="l"
              name="measurement"
              value="l"
              checked={selectedUnit === "l"}
              onChange={handleRadioChange}
            />
            <label htmlFor="l">L</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="gram"
              name="measurement"
              value="gram"
              checked={selectedUnit === "gram"}
              onChange={handleRadioChange}
            />
            <label htmlFor="gram">gram</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="piece"
              name="measurement"
              value="piece"
              checked={selectedUnit === "piece"}
              onChange={handleRadioChange}
            />
            <label htmlFor="piece">piece(ces)</label>
          </div>
          <div className="radio-option">
            <input
              type="radio"
              id="glass"
              name="measurement"
              value="glass"
              checked={selectedUnit === "glass"}
              onChange={handleRadioChange}
            />
            <label htmlFor="glass">glass(es)</label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Measurements;
