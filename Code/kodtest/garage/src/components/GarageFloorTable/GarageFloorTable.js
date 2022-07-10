import React, {useEffect, useState} from 'react';

import './GarageFloorTable.css'

const GarageFloorTable = ({garageFloors}) => {
  const [currentFloorIndex, setCurrentFloorIndex] = useState(1);
  const [numberOfAvailableCarSpots, setNumberOfAvailableCarSpots] = useState();
  const [availableHandicapCarSpots, setNumberOfAvailableHandicapCarSpots] = useState();
  const [availableChargingCarSpots, setNumberOfAvailableChargingCarSpots] = useState();
  const [numberOfAvailableMcSpots, setNumberOfAvailableMcSpots] = useState();

  function getNumberOfFloors() {
    return garageFloors.floors.length - 1;
  }

  function getAvailableSpaces(floorIndex) {
    const currentFloorParkingSpots = garageFloors.floors[currentFloorIndex].parking_spots;

    const availableCarSpots = currentFloorParkingSpots.filter(spot => spot.type === 'car' && spot.is_available && !spot.is_disabled_parking);
    const availableHandicapCarSpots = currentFloorParkingSpots.filter(spot => spot.type === 'car' && spot.is_available && spot.is_disabled_parking);
    const availableChargingCarSpots = currentFloorParkingSpots.filter(spot => spot.type === 'car' && spot.is_available && spot.is_charging_station);
    const availableMcSpots = currentFloorParkingSpots.filter(spot => spot.type === 'mc' && spot.is_available && !spot.is_disabled_parking);

    setNumberOfAvailableCarSpots(availableCarSpots.length);
    setNumberOfAvailableChargingCarSpots(availableChargingCarSpots.length);
    setNumberOfAvailableHandicapCarSpots(availableHandicapCarSpots.length);
    setNumberOfAvailableMcSpots(availableMcSpots.length);
  }

  function goToNextFloor(){
    let nextFloorIndex = currentFloorIndex+1;
    if (nextFloorIndex > getNumberOfFloors()) {
      nextFloorIndex = 0;
    }
    setCurrentFloorIndex(nextFloorIndex);
  }

  function goToPrevFloor(){
    let nextFloorIndex = currentFloorIndex-1;
    if (nextFloorIndex < 0) {
      nextFloorIndex = getNumberOfFloors();
    }
    setCurrentFloorIndex(nextFloorIndex);
  }

  useEffect(()=>{
    if (garageFloors) {
      getAvailableSpaces(currentFloorIndex);
      console.log(garageFloors);
    }
  },[garageFloors, currentFloorIndex])


  return (
    <div id="container">
      <h3>Floor {currentFloorIndex}</h3>
      <h1>Car: {numberOfAvailableCarSpots} </h1>
      <h2>C: {availableChargingCarSpots} H: {availableHandicapCarSpots} </h2>
      <br/><br/>
      <h2>MC: {numberOfAvailableMcSpots} </h2>
      <h5>Available spaces</h5>

      <div id="container__buttons">
        <button onClick={goToPrevFloor}>Prev Floor</button>
        <button onClick={goToNextFloor}>Next Floor</button>
      </div>
    </div>
  )
}


export default GarageFloorTable;