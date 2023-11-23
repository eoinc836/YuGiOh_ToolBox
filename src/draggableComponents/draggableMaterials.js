import React, { useState } from 'react';

const DraggableCardMaterials = ({ increaseBoxes, boxItems, setBoxItems }) => {
  const [selectedMaterials, setSelectedMaterials] = useState('');
  const [jsonData, setJsonData] = useState({});
  const [equalChecked, setEqualsChecked] = useState(true)
  const [includesChecked, setIncludesChecked] = useState(false)

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', selectedMaterials);
    e.dataTransfer.setData('application/json', JSON.stringify(jsonData));
  };
  
  const handleMaterialsChange = (e) => {
    const newValue = e.target.value;
    setSelectedMaterials(newValue);
    setJsonData({'filter':'materials',
                 'value':newValue,
                 'equals':equalChecked})
    console.log(equalChecked)

  };
  
  const onClick = () => {
    
    const currentJson = jsonData['value']
    
    if (boxItems.length === 1 && !boxItems[0].objectType) {
     
      const newItem = {
        objectType: 'materials',
        value: `${currentJson}`,
        equals: `${equalChecked}`
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
   
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType: 'materials',
        value: `${currentJson}`,
        equals: `${equalChecked}`
      };

      // Update the target box state with the new item
      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
      setBoxItems(newBoxItems);
    }

  }

  const handleEquals = () => {
    setEqualsChecked(true)
    setIncludesChecked(false)

    const currentJson = jsonData['value']
    setJsonData({'filter':'materials',
                 'value':currentJson,
                 'equals':true})
  }

  const handleIncludes = () => {
    setEqualsChecked(false)
    setIncludesChecked(true)

    const currentJson = jsonData['value']
    setJsonData({'filter':'materials',
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
        <div className="item-header">Materials</div>
      </div>
        <div className="dropdown-menu">
        <input className="small-text-box" value={selectedMaterials} onChange={handleMaterialsChange}/>
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


export default DraggableCardMaterials;