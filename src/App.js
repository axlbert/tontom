// App.js
import React, { useState } from 'react';
import Slider from './Slider';
import './App.css';

const tableData = [
  { flaeche: "unter 5", betriebe: 19293, flaecheSum: 13068, flaecheJeBetrieb: 1, annualSortingVolume: 40 },
  { flaeche: "5 bis 10", betriebe: 2083, flaecheSum: 15225, flaecheJeBetrieb: 7, annualSortingVolume: 280 },
  { flaeche: "10 bis 20", betriebe: 2340, flaecheSum: 33327, flaecheJeBetrieb: 14, annualSortingVolume: 560 },
  { flaeche: "20 bis 30", betriebe: 1158, flaecheSum: 28513, flaecheJeBetrieb: 25, annualSortingVolume: 1000 },
  { flaeche: "30 bis 50", betriebe: 1103, flaecheSum: 42273, flaecheJeBetrieb: 38, annualSortingVolume: 1520 },
  { flaeche: "50 bis 100", betriebe: 836, flaecheSum: 57618, flaecheJeBetrieb: 69, annualSortingVolume: 2760 },
  { flaeche: "100 bis 500", betriebe: 434, flaecheSum: 77458, flaecheJeBetrieb: 178, annualSortingVolume: 7120 },
  { flaeche: "500 >", betriebe: 9, flaecheSum: 6016, flaecheJeBetrieb: 668, annualSortingVolume: 26720 }
];

const App = () => {
  const [fieldSize, setFieldSize] = useState(60);
  const [yieldValue, setYieldValue] = useState(40);
  const [sortingWindow, setSortingWindow] = useState(60);
  const [shiftSystem, setShiftSystem] = useState(7);

  const annualSortingVolume = fieldSize * yieldValue;
  const dailySortingVolume = annualSortingVolume / sortingWindow;
  const hourlySortingVolume = dailySortingVolume / shiftSystem;

  const closestRow = tableData.reduce((prev, curr) => (
    Math.abs(curr.annualSortingVolume - annualSortingVolume) < Math.abs(prev.annualSortingVolume - annualSortingVolume) ? curr : prev
  ));

  return (
    <div className="app-container">
      <h1>TonnenTom</h1>
      <div className="sliders">
        <Slider label="Field Size (Hectars)" min={1} max={500} value={fieldSize} onChange={setFieldSize} />
        <Slider label="Yield (Tons)" min={10} max={60} value={yieldValue} onChange={setYieldValue} />
        <div className="results">
          <h2>Annual Sorting Volume: {annualSortingVolume} Tons</h2>
        </div>
        <Slider label="Sorting Window (Days)" min={5} max={365} value={sortingWindow} onChange={setSortingWindow} />
        <Slider label="Shift System (Hours/Day)" min={1} max={24} value={shiftSystem} onChange={setShiftSystem} />
        <div className="results">
          <h2>Daily Sorting Volume: {dailySortingVolume.toFixed(2)} Tons</h2>
          <h2>Hourly Sorting Volume: {hourlySortingVolume.toFixed(2)} Tons</h2>
        </div>
        <div className="approximation">
          <h2>Approximate market size in Germany: {closestRow.betriebe} Betriebe</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Fläche</th>
              <th>Betriebe</th>
              <th>Fläche Sum</th>
              <th>Fläche je Betrieb</th>
              <th>Annual Sorting Volume</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className={row === closestRow ? 'highlight' : ''}>
                <td>{row.flaeche}</td>
                <td>{row.betriebe}</td>
                <td>{row.flaecheSum}</td>
                <td>{row.flaecheJeBetrieb}</td>
                <td>{row.annualSortingVolume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
