import React, { useState, useEffect } from 'react';
import './cardInfoArea.css';

const CardInfoArea = ({ returnedCards }) => {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // Preload data when returnedCards changes
    if (returnedCards) {
      const preloadData = returnedCards.map(cardData => {
        const img = new Image();
        img.src = cardData[1];
        return { name: cardData[0], imageUrl: cardData[1], desc: cardData[2] }; // Include desc attribute in the data
      });

      // Update the state with preloaded data
      setCardData(preloadData);
    }
  }, [returnedCards]);

  return (
    <div className="card-info">
      {cardData.map((data, index) => (
        <div className="infoSection" key={index}>
          <span className='infoSpan'>
            <img src={data.imageUrl} alt={`Card ${index}`} />
            <p>{data.desc}</p>
          </span>
        </div>
      ))}
    </div>
  );
};

export default CardInfoArea;
