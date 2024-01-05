import { useState } from 'react';
import React from 'react';
import ArrowGrid from '../additionalDragComponents/linkArrows';
import PlusButton from '../additionalDragComponents/addArrow';

const DraggableLinkArrows = ({ increaseBoxes, boxItems, setBoxItems }) => {

  const [clickedArrows, setClickedArrows] = useState([]);

  const handleArrowClick = (arrow) => {
    if (clickedArrows.includes(arrow)) {
      setClickedArrows(clickedArrows.filter((clickedArrow) => clickedArrow !== arrow));
    } else {
      setClickedArrows([...clickedArrows, arrow]);
    }
  };
  
  const onClick = () => {
    
    
    
    if (boxItems.length === 1 && !boxItems[0].objectType) {
      const newItem = {
        objectType: 'linkMarkers',
        'value': clickedArrows,
        equals: false
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType: 'linkMarkers',
        'value': clickedArrows,
        equals: false
      };

      // Update the target box state with the new item
      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
      setBoxItems(newBoxItems);
    }

  }
  const jsonData = {'filter':'linkMarkers',
                    'value':clickedArrows,
                    equals:false}

  const handleDragStart = (e) => {

    // Serialize the JSON data to a string and set it as 'text/plain' data
  e.dataTransfer.setData('text/plain', 'Link Rating');
  e.dataTransfer.setData('application/json', JSON.stringify(jsonData));
  console.log(jsonData)
};
  

    

  return (
    <div className="draggable-item">
      <div
        draggable
        className="item-content"
        onDragStart={handleDragStart}
      >
        <div className="item-header">Link Arrows
        <PlusButton id='plusButton' onClickFunction={onClick}/>
        </div>
        <ArrowGrid clickedArrows={clickedArrows} setClickedArrows={setClickedArrows} handleArrowClick={handleArrowClick}/>
      </div>
        
    </div>
  );
};


export default DraggableLinkArrows;