import React from 'react';
import plusIcon from './plus.png'; // Import the PNG image
import '../draggableComponents/draggable.css'
const PlusButton = ({ onClickFunction }) => {
  return (
    <div onClick={onClickFunction}>
      {/* Use the imported PNG image */}
      <img id = {'plusButton'} src={plusIcon} alt="Plus Icon" />
    </div>
  );
};

export default PlusButton;

