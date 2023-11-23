import React, { useState } from 'react';
// MAKE IT SNAP TO LAST DROPZONE (OR CREATE NEW ONE?) ON CLICK
const DraggableMonsterSubType = ({ increaseBoxes, boxItems, setBoxItems }) => {
  const [selectedOption, setSelectedOption] = useState('Normal');
  
  
  const handleDragStart = (e) => {

      // Serialize the JSON data to a string and set it as 'text/plain' data
    e.dataTransfer.setData('text/plain', selectedOption);
    e.dataTransfer.setData('application/json', JSON.stringify(jsonData));
  };
  
  const onClick = () => {
  
    if (boxItems.length === 1 && !boxItems[0].objectType) {
      const newItem = {
        objectType: 'cardSubTypes',
        value: `${selectedOption}`,
        equals: false
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType: 'cardSubTypes',
        value: `${selectedOption}`,
        equals: false
      };

      // Update the target box state with the new item
      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
      setBoxItems(newBoxItems);
    }
    

      // Update the target box state with the new item
  
  

  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);

  };

  const jsonData = {'filter':'cardSubTypes',
                    'value':selectedOption}
  

  return (
    <div className="draggable-item">
      <div
        draggable
        className="item-content"
        onDragStart={handleDragStart}
        onClick={onClick}

      >
        <div className="item-header">Monster Type</div>
      </div>
        <div className="dropdown-menu">
        <select  className='custom-dropdown' value={selectedOption} onChange={handleOptionChange}>

          <option value="Normal">Normal</option>

          <option value="Effect">Effect</option>

          <option value="Ritual">Ritual</option>

          <option value="Fusion">Fusion</option>

          <option value="Synchro">Synchro</option>

          <option value="XYZ">XYZ</option>

          <option value="Toon">Toon</option>

          <option value="Spirit">Spirit</option>

          <option value="Union">Union</option>

          <option value="Gemini">Gemini</option>

          <option value="Tuner">Tuner</option>

          <option value="Flip">Flip</option>

          <option value="Pendulum">Pendulum</option>

          <option value="Link">Link</option>

         

          </select>
        </div>
    </div>
  );
};


export default DraggableMonsterSubType;