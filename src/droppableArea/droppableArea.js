import React, {useEffect } from 'react';
import './droppableArea.css'
const DroppableArea = ({ numberOfBoxes, boxItems, setBoxItems }) => {
  // Initialize state for each box

  useEffect(() => {
    // Calculate the difference in the number of boxes
    const currentBoxCount = boxItems.length;
    const diff = numberOfBoxes - currentBoxCount;

    if (diff > 0) {
      // If there are more boxes, add empty arrays for the new boxes
      setBoxItems((prevBoxItems) => [
        ...prevBoxItems,
        ...Array(diff).fill([]),
      ]);
    } else if (diff < 0) {
      // If there are fewer boxes, remove the last boxes and their items
      setBoxItems((prevBoxItems) => prevBoxItems.slice(0, numberOfBoxes));
    }
  }, [numberOfBoxes, boxItems, setBoxItems]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const objectData = JSON.parse(e.dataTransfer.getData('application/json'));
    var newItem = null
    // Update the target box state
    console.log(objectData,'obj')
    if (objectData['filter'] == 'name' || objectData['filter'] == 'desc' || objectData['filter'] == 'materials'){
      
      newItem = {
        objectType: objectData['filter'],
        value: objectData['value'],
        equals: objectData['equals']
      };
    }
    else{
      newItem = {
        objectType: objectData['filter'],
        value: objectData['value'],
        equals: false
      };
    }
    
  
    // Update the target box state with the new item
    const newBoxItems = [...boxItems];
    newBoxItems[index] = newItem;
    setBoxItems(newBoxItems);
  };

  return (
    <div className="scrollable-container">
      <div className="scrollable-content">
        {/* Render the desired number of boxes */}
        {Array(numberOfBoxes).fill().map((_, index) => (
          <div key={index} className="area" onDragOver={handleDragOver}>
            <div className="box" onDrop={(e) => handleDrop(e, index)}>
              {boxItems[index] && (
                <div className="dropped-item">
              <p className='Value'>{boxItems[index].value}</p>
              <p className='Type'>({boxItems[index].objectType})</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default DroppableArea;
