export let crateData = [
    {
      id: 'CRATE001',
      qrCode: 'QR001',
      variety: 'mary',
      status: 'fresh harvest sorted',
      position: 'Warehouse A',
      qualityGrade: 'A',
      size: 'Large',
      weight: '50kg',
      harvestDate: '2024-08-08',
      harvestLocation: 'Farm 1',
    },
    // More crates...
  ];
  
  export const addCrate = (newCrate) => {
    crateData.push(newCrate);
  };
  
  export const deleteCrate = (id) => {
    crateData = crateData.filter(crate => crate.id !== id);
  };
  