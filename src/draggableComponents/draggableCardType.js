import React, { useState } from 'react';
// MAKE IT SNAP TO LAST DROPZONE (OR CREATE NEW ONE?) ON CLICK
const DraggableCardType = ({ increaseBoxes, boxItems, setBoxItems }) => {
  const [selectedOption, setSelectedOption] = useState('Monster');
  
  const onClick = () => {

    if (boxItems.length === 1 && !boxItems[0].objectType) {
      const newItem = {
        objectType: 'cardType',
        value: `${selectedOption}`,
        equals: false
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType: 'cardType',
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

  const jsonData = {'filter':'cardType',
                    'value':selectedOption}
  

  return (
    <div className="draggable-item">
      <div
        draggable
        className="item-content"
        onDragStart={handleDragStart}
        onClick={onClick}
      >
        <div className="item-header">Card Type</div>
      </div>
        <div className="dropdown-menu">
        <select  className='custom-dropdown' value={selectedOption} onChange={handleOptionChange}>

          <option value="Monster">Monster</option>

          <option value="Spell">Spell</option>

          <option value="Trap">Trap</option>

          </select>
        </div>
    </div>
  );
};


export default DraggableCardType;