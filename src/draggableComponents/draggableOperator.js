import React from 'react';

const DraggableOperator = ({ increaseBoxes, boxItems, setBoxItems, text }) => {

  const jsonData = {'filter':'operator',
                    'value':text}

                    
    const handleDragStart = (e) => {
      e.dataTransfer.setData('application/json', JSON.stringify(jsonData));
      e.dataTransfer.setData('text/plain', text);
    };
    
    const onClick = () => {
    
    
    
      if (boxItems.length === 1 && !boxItems[0].objectType) {
        const newItem = {
          objectType: 'operator',
          value: `${text}`
        };
        setBoxItems([newItem]);
      } else {
        increaseBoxes();
        // If there are multiple droppable areas or non-empty droppable areas, add to the end
        const newItem = {
          objectType: 'operator',
          value: `${text}`
        };
  
        // Update the target box state with the new item
        const newBoxItems = [...boxItems];
        newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
        setBoxItems(newBoxItems);
      }
  
    }
    return (
      <div
        className="draggable-operator"
        draggable
        onDragStart={handleDragStart}
        onClick={onClick}
      >
        <div className="item-header">{text}</div>
      </div>
    );
  };


export default DraggableOperator;

