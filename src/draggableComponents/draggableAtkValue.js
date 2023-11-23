import React, { useState } from 'react';
import PlusButton from '../additionalDragComponents/addArrow';
import './draggable.css';

const DraggableAtkValue = ({ increaseBoxes, boxItems, setBoxItems }) => {
  const [selectedValues, setSelectedValues] = useState({});
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

  const onClick = () => {
   

    if (boxItems.length === 1 && !boxItems[0].objectType) {
      const newItem = {
        objectType: 'AtkValue',
        value: `${minValue}<=ATK<=${maxValue}`,
        equals: false
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      const newItem = {
        objectType: 'AtkValue',
        value: `${minValue}<=ATK<=${maxValue}`,
        equals: false
      };

      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem);
      setBoxItems(newBoxItems);
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', `${minValue}<=ATK<=${maxValue}`);
    e.dataTransfer.setData('application/json', JSON.stringify(selectedValues));
  };

  const handleMinChange = (e) => {
    const newValue = e.target.value;
    setMinValue(newValue);
    setSelectedValues({
      objectType: 'AtkValue',
      value: `${newValue}<=ATK<=${maxValue}`,
      
    });
  };

  const handleMaxChange = (e) => {
    const newValue = e.target.value;
    setMaxValue(newValue);
    setSelectedValues({
      objectType: 'AtkValue',
      value: `${minValue}<=ATK<=${newValue}`,
      
    });
  };

  return (
    <div className="draggable-item">
      <div className="item-header">Attack
      <PlusButton id='plusButton' onClickFunction={onClick}/>
      </div>
      <div draggable className="item-content" onDragStart={handleDragStart}>
        Max:
        <input type="number" id="inputType" onChange={handleMaxChange} value={maxValue} />
        <br />
        Min:
        <input type="number" id="inputType" onChange={handleMinChange} value={minValue} />
      </div>
    </div>
  );
};

export default DraggableAtkValue;
