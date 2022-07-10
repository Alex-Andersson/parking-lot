import React, {useEffect, useState} from 'react'

import GarageFloorTable from './components/GarageFloorTable/GarageFloorTable';

const App = () => {
  const [garageFloors, setGarageFloors] = useState();

  const getGarageFloors = async () => {
    const garageFloors = await fetch('https://adp.im/api/garage.json');
    const garageFloorsJson = await garageFloors.json();

    setGarageFloors(garageFloorsJson);
  }

  useEffect(()=>{
      getGarageFloors();
  }, []);



  return (
    <div>
      <GarageFloorTable garageFloors={garageFloors} />
    </div>
  )
}


export default App