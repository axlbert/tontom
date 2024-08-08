import React, { useState } from 'react';

const CrateForm = ({ onSave }) => {
  const [crate, setCrate] = useState({
    id: '',
    qrCode: '',
    variety: 'mary',
    status: 'empty',
    position: '',
    qualityGrade: '',
    size: '',
    weight: '',
    harvestDate: '',
    harvestLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrate(prevCrate => ({ ...prevCrate, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(crate);
    setCrate({
      id: '',
      qrCode: '',
      variety: 'mary',
      status: 'empty',
      position: '',
      qualityGrade: '',
      size: '',
      weight: '',
      harvestDate: '',
      harvestLocation: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="id" value={crate.id} onChange={handleChange} placeholder="ID" required />
      <input name="qrCode" value={crate.qrCode} onChange={handleChange} placeholder="QR Code" required />
      <select name="variety" value={crate.variety} onChange={handleChange}>
        <option value="mary">Mary</option>
        <option value="carry">Carry</option>
        <option value="sarry">Sarry</option>
        <option value="barry">Barry</option>
        <option value="larry">Larry</option>
      </select>
      <select name="status" value={crate.status} onChange={handleChange}>
        <option value="empty">Empty</option>
        <option value="fresh harvest sorted">Fresh Harvest Sorted</option>
        <option value="b-product sorted">B-Product Sorted</option>
        <option value="pigfeed">Pigfeed</option>
        <option value="waste">Waste</option>
        <option value="in storage">In Storage</option>
        <option value="to clean">To Clean</option>
      </select>
      <input name="position" value={crate.position} onChange={handleChange} placeholder="Position" required />
      <input name="qualityGrade" value={crate.qualityGrade} onChange={handleChange} placeholder="Quality Grade" required />
      <input name="size" value={crate.size} onChange={handleChange} placeholder="Size" required />
      <input name="weight" value={crate.weight} onChange={handleChange} placeholder="Weight" required />
      <input name="harvestDate" value={crate.harvestDate} onChange={handleChange} placeholder="Harvest Date" required />
      <input name="harvestLocation" value={crate.harvestLocation} onChange={handleChange} placeholder="Harvest Location" required />
      <button type="submit">Save</button>
    </form>
  );
};

export default CrateForm;
