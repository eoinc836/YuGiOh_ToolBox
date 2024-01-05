import { useState } from 'react';
import React from 'react';
import NumberGrid from '../additionalDragComponents/numberGrid';
import PlusButton from '../additionalDragComponents/addArrow';
const DraggableLevel = ({ increaseBoxes, boxItems, setBoxItems }) => {

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
        objectType: 'lvl',
        value: `${clickedNumbers}`,
        equals : false
      };
      setBoxItems([newItem]);
    } else {
      increaseBoxes();
      // If there are multiple droppable areas or non-empty droppable areas, add to the end
      const newItem = {
        objectType: 'lvl',
        value: `${clickedNumbers}`,
        equals : false
      };

      // Update the target box state with the new item
      const newBoxItems = [...boxItems];
      newBoxItems.push(newItem); // Add the new item to the end of the boxItems array
      setBoxItems(newBoxItems);
    }

  }
  const jsonData = {'filter':'lvl',
                    'value':`${clickedNumbers}`,
                    equals: false}

  const handleDragStart = (e) => {

    // Serialize the JSON data to a string and set it as 'text/plain' data
  e.dataTransfer.setData('text/plain', 'Levels');
  e.dataTransfer.setData('application/json', JSON.stringify(jsonData));
};
  

    

  return (
    <div className="draggable-item">
      <div
        draggable
        className="item-content"
        onDragStart={handleDragStart}
      >
        <div className="item-header">Levels
        <PlusButton id='plusButton' onClickFunction={onClick}/>
        </div>
        <NumberGrid clickedNumbers={clickedNumbers} onNumberClick={handleNumberClick} />
      </div>
        
    </div>
  );
};


export default DraggableLevel;