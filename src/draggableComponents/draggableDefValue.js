import React, { useState } from 'react';
import PlusButton from '../additionalDragComponents/addArrow';


const DraggableDefValue = ({ increaseBoxes, boxItems, setBoxItems }) => {
  const [selectedValues, setSelectedValues] = useState({});
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);


  const onClick = () => {
    
    
    
    if (boxItems.length === 1 && !boxItems[0].objectType) {
      const newItem = {
        objectType: 'DefValue',
        value: `${minValue}<=DEF<=${maxValue}`,
        equals: false
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType: 'DefValue',
        value: `${minValue}<=DEF<=${maxValue}`,
        equals: false
      };

      // Update the target box state with the new item
      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
      setBoxItems(newBoxItems);
    }

  }
  
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', `${minValue}<=DEF<=${maxValue}`);
    e.dataTransfer.setData('application/json', JSON.stringify(selectedValues));
  };
  

  const handleMinChange = (e) => {
    const newValue = e.target.value;
    setMinValue(newValue);
    setSelectedValues({
      'filter': 'DefValue',
      'value': `${newValue}<=DEF<=${maxValue}`
    });
  };

  const handleMaxChange = (e) => {
    const newValue = e.target.value;
    setMaxValue(newValue);
    setSelectedValues({
      'filter': 'DefValue',
      'value': `${minValue}<=DEF<=${newValue}`
    });
  };

  return (
    <div className="draggable-item">
      <div
        draggable
        className="item-content"
        onDragStart={handleDragStart}
      >
    <div className="item-header">Defense
    <PlusButton id='plusButton' onClickFunction={onClick}/>
    </div>
   
    Max:   
    <input
        type="number"
        id="inputType"
        onChange={handleMaxChange}
        value={maxValue}
      />
    Min:   
    <input
        type="number"
        id="inputType"
        onChange={handleMinChange}
        value={minValue}
      />
      </div>
        
    </div>
  );
};


export default DraggableDefValue;