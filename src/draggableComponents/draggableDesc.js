import React, { useState } from 'react';
import GreenPlusButton from '../additionalDragComponents/addArrow';

const DraggableCardDesc = ({ increaseBoxes, boxItems, setBoxItems }) => {
  const [selectedDesc, setSelectedDesc] = useState('');
  const [jsonData, setJsonData] = useState({});
  const [equalChecked, setEqualsChecked] = useState(true)
  const [includesChecked, setIncludesChecked] = useState(false)
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', selectedDesc);
    e.dataTransfer.setData('application/json', JSON.stringify(jsonData));
  };
  
  const onClick = () => {
    
    
    
    if (boxItems.length === 1 && !boxItems[0].objectType) {
      const newItem = {
        objectType: 'desc',
        value: `${selectedDesc}`
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType: 'desc',
        value: `${selectedDesc}`
      };

      // Update the target box state with the new item
      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
      setBoxItems(newBoxItems);
    }

  }

  const handleDescChange = (e) => {
    const newValue = e.target.value;
    setSelectedDesc(newValue);
    setJsonData({'filter':'desc',
                 'value':newValue,
                 'equals':equalChecked})

  };

  const handleEquals = () => {
    setEqualsChecked(true)
    setIncludesChecked(false)

    const currentJson = jsonData['value']
    setJsonData({'filter':'desc',
                 'value':currentJson,
                 'equals':true})
  }

  const handleIncludes = () => {
    setEqualsChecked(false)
    setIncludesChecked(true)

    const currentJson = jsonData['value']
    setJsonData({'filter':'desc',
                 'value':currentJson,
                 'equals':false})
  }
    
    

  return (
    <div className="draggable-item">
      <div
        draggable
        classDesc="item-content"
        onDragStart={handleDragStart}
        onClick={onClick}
      >
        <div className="item-header">Description
        </div>
      </div>
        <div className="dropdown-menu">
        <input className="small-text-box" value={selectedDesc} onChange={handleDescChange}/>
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


export default DraggableCardDesc;