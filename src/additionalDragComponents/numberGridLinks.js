import React, { useState } from 'react';

const NumberGrid = ({ clickedNumbers, onNumberClick}) => {

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 20px)', gridGap: '1px' }}>
      {[1, 2, 3, 4, 5, 6].map((number) => (
        <div
          key={number}
          onClick={() => onNumberClick(number)}
          style={{
            width: '20px',
            height: '20px',
            backgroundColor:  '#B9B4C7',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '20px',
            boxShadow: clickedNumbers.includes(number) ? 'inset 2px 2px 2px gray' : 'none',
          }}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default NumberGrid;
