import { useState } from 'react';
import React from 'react';
import NumberGridLinks from '../additionalDragComponents/numberGridLinks';
import PlusButton from '../additionalDragComponents/addArrow';
const DraggableLinkRating = ({ increaseBoxes, boxItems, setBoxItems }) => {

  const [clickedNumbers, setClickedNumbers] = useState([]);

  const handleNumberClick = (number) => {
    // Update the clickedNumbers state
    if (clickedNumbers.includes(number)) {
      setClickedNumbers(clickedNumbers.filter((num) => num !== number));
    } else {
      setClickedNumbers([...clickedNumbers, number]);
    }
  };

  const onClick = () => {
    
    
    
    if (boxItems.length === 1 && !boxItems[0].objectType) {
      const newItem = {
        objectType : 'linkRating',
        value: `${clickedNumbers}`,
        equals: false
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType : 'linkRating',
        value: `${clickedNumbers}`,
        equals: false
      };

      // Update the target box state with the new item
      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
      setBoxItems(newBoxItems);
    }

  }

  const jsonData = {'filter':'linkRating',
                    'value':clickedNumbers}

  const handleDragStart = (e) => {

    // Serialize the JSON data to a string and set it as 'text/plain' data
  e.dataTransfer.setData('text/plain', 'Link Rating');
  e.dataTransfer.setData('application/json', JSON.stringify(jsonData));
};
  

    

  return (
    <div className="draggable-item">
      <div
        draggable
        className="item-content"
        onDragStart={handleDragStart}
      >
        <div className="item-header">Link Rating
        <PlusButton id='plusButton' onClickFunction={onClick}/>
        </div>
        <NumberGridLinks clickedNumbers={clickedNumbers} onNumberClick={handleNumberClick} />
      </div>
        
    </div>
  );
};


export default DraggableLinkRating;