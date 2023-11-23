import React, { useState } from 'react';
// MAKE IT SNAP TO LAST DROPZONE (OR CREATE NEW ONE?) ON CLICK
const DraggableType = ({ increaseBoxes, boxItems, setBoxItems }) => {
  const [selectedOption, setSelectedOption] = useState('Aqua');
  
  
  const handleDragStart = (e) => {

      // Serialize the JSON data to a string and set it as 'text/plain' data
    e.dataTransfer.setData('text/plain', selectedOption);
    e.dataTransfer.setData('application/json', JSON.stringify(jsonData));
  };
  
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);

  };

  const onClick = () => {
    
    
    
    if (boxItems.length === 1 && !boxItems[0].objectType) {
      const newItem = {
        objectType: 'monsterType',
        value: `${selectedOption}`,
        equals: false
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType: 'monsterType',
        value: `${selectedOption}`,
        equals: false
      };

      // Update the target box state with the new item
      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
      setBoxItems(newBoxItems);
    }

  }

  const jsonData = {'filter':'monsterType',
                    'value':selectedOption}
  

  return (
    <div className="draggable-item">
      <div
        draggable
        className="item-content"
        onDragStart={handleDragStart}
        onClick={onClick}
      >
        <div className="item-header">Type</div>
      </div>
        <div className="dropdown-menu">
          <select  className='custom-dropdown' value={selectedOption} onChange={handleOptionChange}>
            <option value="Aqua">Aqua</option>
            <option value="Beast">Beast</option>
            <option value="Beast-Warrior">Beast-Warrior</option>
            <option value="Cyberse">Cyberse</option>
            <option value="Dinosaur">Dinosaur</option>
            <option value="Divine-Beast">Divine-Beast</option>
            <option value="Dragon">Dragon</option>
            <option value="Fairy">Fairy</option>
            <option value="Fiend">Fiend</option>
            <option value="Fish">Fish</option>
            <option value="Illusion">Illusion</option>
            <option value="Insect">Insect</option>
            <option value="Machine">Machine</option>
            <option value="Plant">Plant</option>
            <option value="Psychic">Psychic</option>
            <option value="Pyro">Pyro</option>
            <option value="Reptile">Reptile</option>
            <option value="Rock">Rock</option>
            <option value="Sea Serpent">Sea Serpent</option>
            <option value="Spellcaster">Spellcaster</option>
            <option value="Thunder">Thunder</option>
            <option value="Warrior">Warrior</option>
            <option value="Winged Beast">Winged Beast</option>
            <option value="Wyrm">Wyrm</option>
            <option value="Zombie">Zombie</option>
          </select>
        </div>
    </div>
  );
};


export default DraggableType;