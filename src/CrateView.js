import React, { useState, useEffect } from 'react';
import { crateData, addCrate, deleteCrate } from './mockData';
import CrateForm from './CrateForm';

const CrateView = () => {
  const [crates, setCrates] = useState([]);

  useEffect(() => {
    setCrates([...crateData]);
  }, []);

  const handleAddCrate = (newCrate) => {
    addCrate(newCrate);
    setCrates([...crateData]);
  };

  const handleDelete = (id) => {
    deleteCrate(id);
    setCrates([...crateData]);
  };

  return (
    <div>
      <h1>Crate View</h1>
      <CrateForm onSave={handleAddCrate} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Variety</th>
            <th>Status</th>
            <th>Position</th>
            <th>Quality Grade</th>
            <th>Size</th>
            <th>Weight</th>
            <th>Harvest Date</th>
            <th>Harvest Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crates.map(crate => (
            <tr key={crate.id}>
              <td>{crate.id}</td>
              <td>{crate.variety}</td>
              <td>{crate.status}</td>
              <td>{crate.position}</td>
              <td>{crate.qualityGrade}</td>
              <td>{crate.size}</td>
              <td>{crate.weight}</td>
              <td>{crate.harvestDate}</td>
              <td>{crate.harvestLocation}</td>
              <td>
                <button onClick={() => handleDelete(crate.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrateView;
