import React, { useState } from 'react';
// MAKE IT SNAP TO LAST DROPZONE (OR CREATE NEW ONE?) ON CLICK
const DraggableAttribute = ({increaseBoxes, boxItems, setBoxItems }) => {
  const [selectedOption, setSelectedOption] = useState('DARK');
  
  const onClick = () => {
    
    
    
    if (boxItems.length === 1 && !boxItems[0].objectType) {
      const newItem = {
        objectType: 'attr',
        value: `${selectedOption}`,
        equals: false
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType: 'attr',
        value: `${selectedOption}`,
        equals: false
      };

      // Update the target box state with the new item
      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
      setBoxItems(newBoxItems);
    }

  }

  const handleDragStart = (e) => {

      // Serialize the JSON data to a string and set it as 'text/plain' data
    e.dataTransfer.setData('text/plain', selectedOption);
    e.dataTransfer.setData('application/json', JSON.stringify(jsonData));
  };
  
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);

  };

  const jsonData = {'filter':'attr',
                    'value':selectedOption}
  

  return (
    <div className="draggable-item">
      <div
        draggable
        className="item-content"
        onDragStart={handleDragStart}
        onClick={onClick}

      >
        <div className="item-header">Attribute</div>
      </div>
        <div className="dropdown-menu">
        <select className='custom-dropdown' value={selectedOption} onChange={handleOptionChange}>

          <option value="DARK">Dark</option>

          <option value="LIGHT">Light</option>

          <option value="WIND">Wind</option>

          <option value="FIRE">Fire</option>
          
          <option value="WATER">Water</option>

          <option value="EARTH">Earth</option>

          <option value="DIVINE">Divine</option>
         

          </select>
        </div>
    </div>
  );
};


export default DraggableAttribute;