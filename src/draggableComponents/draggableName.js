import React, { useState } from 'react';

const DraggableCardName = ({increaseBoxes, boxItems, setBoxItems }) => {
  const [selectedName, setSelectedName] = useState('');
  
  const [equalChecked, setEqualsChecked] = useState(true)
  const [includesChecked, setIncludesChecked] = useState(false)

  const [jsonData, setJsonData] = useState({});
  const onClick = () => {
    
    if (boxItems.length === 1 && !boxItems[0].objectType) {
      const newItem = {
        objectType: 'name', // Customize this based on your data structure
        value: selectedName,
        equals: equalChecked,
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType: 'name', // Customize this based on your data structure
        value: selectedName,
        equals: equalChecked,
      };

      // Update the target box state with the new item
      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
      setBoxItems(newBoxItems);
    }
   
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', selectedName);
    e.dataTransfer.setData('application/json', JSON.stringify(jsonData));
  };
  
  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setSelectedName(newValue);
    setJsonData({'filter':'name',
                 'value':newValue,
                 'equals':equalChecked})

  };

  const handleEquals = () => {
    setEqualsChecked(true)
    setIncludesChecked(false)

    const currentJson = jsonData['value']
    setJsonData({'filter':'name',
                 'value':currentJson,
                 'equals':true})
  }

  const handleIncludes = () => {
    setEqualsChecked(false)
    setIncludesChecked(true)

    const currentJson = jsonData['value']
    setJsonData({'filter':'name',
                 'value':currentJson,
                 'equals':false})
  }
    
    

  return (
    <div className="draggable-item">
      <div
        draggable
        className="item-content"
        onDragStart={handleDragStart}
        onClick={onClick}
      >
        <div className="item-header">Name</div>
      </div>
        <div className="dropdown-menu">
        <input className="small-text-box" value={selectedName} onChange={handleNameChange}/>
        <label className="radio-button">
        <input type="radio" checked={equalChecked} onChange={handleEquals}/>
        <input type='radio' checked={includesChecked} onChange={handleIncludes}/>
        <br></br>
        Equals     
        Includes
        </label>
        </div>
    </div>
  );
};


export default DraggableCardName;