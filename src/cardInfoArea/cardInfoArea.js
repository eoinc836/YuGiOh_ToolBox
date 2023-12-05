import React, { useState, useEffect } from 'react';
import { BarLoader } from 'react-spinners';
import './cardInfoArea.css';

const CardInfoArea = ({ returnedCards }) => {
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    // Reset loading state when returnedCards changes
    setLoading(true);

    if (returnedCards && returnedCards.length > 0) {
      // Create an array to keep track of image load status
      const imageLoadStatus = Array(returnedCards.length).fill(false);

      const preloadData = returnedCards.map((cardData, index) => {
        const img = new Image();
        img.onload = () => {
          // Set image load status to true when the image is loaded
          imageLoadStatus[index] = true;

          // Check if all images are loaded
          if (imageLoadStatus.every((status) => status === true)) {
            setLoading(false); // Set loading to false when all images are loaded
          }
        };
        img.src = cardData[1];

        return { name: cardData[0], imageUrl: cardData[1], desc: cardData[2], type: cardData[3], atk: cardData[4], def: cardData[5], subTypes: cardData[6] };
      });

      setCardData(preloadData);
    } else {
      setLoading(false); // Set loading to false when no cards to load
    }
  }, [returnedCards]);

  return (
    <div className="card-info">
      {loading ? (
        // Display loader only when there is a loading state
        <div className="loader-container">
          <BarLoader color={'#36D7B7'} loading={loading} />
        </div>
      ) : (
        cardData.map((data, index) => (
          <div className="infoSection" key={index}>
            <span className='infoSpan'>
              <p className='cardName'>{data.name}</p>
              <img src={data.imageUrl} alt={`Card ${index}`} />
              <p className='cardDesc'>{data.desc}</p>
                {data.type === 'Monster' && !(data.subTypes.includes('Link')) ? (
                  <p className='atk-def'>ATK/{data.atk} DEF/{data.def}</p>
                ) :(data.subTypes.includes('Link')) ? (
                  <p className='atk-def'>ATK/{data.atk}</p>
                ) : (
                  <></>
                )}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default CardInfoArea;
