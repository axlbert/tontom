import React, { useState } from 'react';
import Slider from './Slider';
import './App.css';

const tableData = [
  { flaeche: "unter 5", betriebe: 19293, flaecheSum: 13068, flaecheJeBetrieb: 1 },
  { flaeche: "5 bis 10", betriebe: 2083, flaecheSum: 15225, flaecheJeBetrieb: 7 },
  { flaeche: "10 bis 20", betriebe: 2340, flaecheSum: 33327, flaecheJeBetrieb: 14 },
  { flaeche: "20 bis 30", betriebe: 1158, flaecheSum: 28513, flaecheJeBetrieb: 25 },
  { flaeche: "30 bis 50", betriebe: 1103, flaecheSum: 42273, flaecheJeBetrieb: 38 },
  { flaeche: "50 bis 100", betriebe: 836, flaecheSum: 57618, flaecheJeBetrieb: 69 },
  { flaeche: "100 bis 500", betriebe: 434, flaecheSum: 77458, flaecheJeBetrieb: 178 },
  { flaeche: "500 >", betriebe: 9, flaecheSum: 6016, flaecheJeBetrieb: 668 }
];

const App = () => {
  const [fieldSize, setFieldSize] = useState(60);
  const [yieldValue, setYieldValue] = useState(40);
  const [sortingWindow, setSortingWindow] = useState(60);
  const [shiftSystem, setShiftSystem] = useState(7);

  // Calculate the volumes based on current slider values
  const annualSortingVolume = fieldSize * yieldValue;
  const dailySortingVolume = annualSortingVolume / sortingWindow;
  const hourlySortingVolume = dailySortingVolume / shiftSystem;

  // Determine the Betriebsart
  let betriebsart;
  if (sortingWindow > 121 && fieldSize < 60) {
    betriebsart = "Selbstvermarkter";
  } else if (sortingWindow <= 121) {
    betriebsart = "Anbauer Handel";
  } else {
    betriebsart = "Unbekannt"; // Just as a fallback
  }

  // Find the closest matching row
  const closestRow = tableData.reduce((prev, curr) => {
    const currAnnualVolume = curr.flaecheJeBetrieb * yieldValue;
    return Math.abs(currAnnualVolume - annualSortingVolume) < Math.abs(prev.flaecheJeBetrieb * yieldValue - annualSortingVolume) ? curr : prev;
  });

  return (
    <div className="app-container">
      <h1>Mengenkalkulator</h1>
      <div className="sliders">
        <Slider label="Feldgröße (ha)" min={1} max={500} value={fieldSize} onChange={setFieldSize} />
        <Slider label="Ertrag (t)" min={10} max={60} value={yieldValue} onChange={setYieldValue} />
        <div className="results">
          <h2>Jährliches Sortiervolumen: {annualSortingVolume} (t)</h2>
        </div>
        <Slider label="Sortierfenster (Tage)" min={5} max={365} value={sortingWindow} onChange={setSortingWindow} />
        <Slider label="Schichtsystem (Std/Tag)" min={1} max={24} value={shiftSystem} onChange={setShiftSystem} />
        <div className="results">
          <h2>Sortierbedarf/Tag: {dailySortingVolume.toFixed(2)} (t)</h2>
          <h2>Sortierbedarf/Std: {hourlySortingVolume.toFixed(2)} (t)</h2>
        </div>
      
        <div className="approximation">
          <h3>Betriebe im Segment (DE): {closestRow.betriebe}</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Fläche (ha)</th>
              <th>Betriebe</th>
              <th>Ha/Betrieb</th>
              <th>Jahresmenge (t)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => {
              const calculatedAnnualVolume = row.flaecheJeBetrieb * yieldValue;
              return (
                <tr key={index} className={row === closestRow ? 'highlight' : ''}>
                  <td>{row.flaeche}</td>
                  <td>{row.betriebe}</td>
                  <td>{row.flaecheJeBetrieb}</td>
                  <td>{calculatedAnnualVolume}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="approximation">
          <p>Betriebsart: {betriebsart}</p>
          <p>Platzhalter Feature</p>
        </div>
      </div>
    </div>
  );
};

export default App;
