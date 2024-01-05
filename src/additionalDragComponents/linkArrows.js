import React from 'react';

const ArrowGrid = ({ clickedArrows, setClickedArrows, handleArrowClick}) => {
  const ArrowIcons = {
    Top: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill={clickedArrows.includes('Top') ? 'red' : '#FAF0E6'} width="48px" height="48px">
      <path d="M24 4l20 28H4z" />
  
    </svg>
    ),
    Left: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill={clickedArrows.includes('Left') ? 'red' : '#FAF0E6'} width="48px" height="48px">
        <g transform={`rotate(270 24 24)`}>
      <path d="M24 4l20 28H4z" />
      </g>
      </svg>
    ),
    Bottom: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill={clickedArrows.includes('Bottom') ? 'red' : '#FAF0E6'} width="48px" height="48px">
        <g transform={`rotate(180 24 24)`}>
      <path d="M24 4l20 28H4z" />
      </g>
      </svg>
    ),
    Right: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill={clickedArrows.includes('Right') ? 'red' : '#FAF0E6'} width="48px" height="48px">
        <g transform={`rotate(90 24 24)`}>
      <path d="M24 4l20 28H4z" />
      </g>
      </svg>
    ),
    TopLeft: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill={clickedArrows.includes('TopLeft') ? 'red' : '#FAF0E6'} width="48px" height="48px">
      <g transform={`rotate(315 24 24)`}>
    <path d="M24 4l20 28H4z" />
    </g>
    </svg>
    ),
    TopRight: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill={clickedArrows.includes('TopRight') ? 'red' : '#FAF0E6'} width="48px" height="48px">
      <g transform={`rotate(45 24 24)`}>
    <path d="M24 4l20 28H4z" />
    </g>
    </svg>
    ),
    BottomLeft: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill={clickedArrows.includes('BottomLeft') ? 'red' : '#FAF0E6'} width="48px" height="48px">
      <g transform={`rotate(225 24 24)`}>
    <path d="M24 4l20 28H4z" />
    </g>
    </svg>
    ),
    BottomRight: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill={clickedArrows.includes('BottomRight') ? 'red' : '#FAF0E6'} width="48px" height="48px">
      <g transform={`rotate(135 24 24)`}>
    <path d="M24 4l20 28H4z" />
    </g>
    </svg>
    ),
  };



  const arrowDirections = ['TopLeft','Top', 'TopRight','Left', '', 'Right',  'BottomLeft', 'Bottom','BottomRight'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 20px)', gridGap: '5px' }}>
      {arrowDirections.map((arrow, index) => (
        <div
          key={index}
          onClick={() => handleArrowClick(arrow)}
          style={{
            marginLeft: '22px',
            width: '20px',
            height: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          {ArrowIcons[arrow]}
        </div>
      ))}
    </div>
  );
};

export default ArrowGrid;
