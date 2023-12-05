import React, { useState } from 'react';
import './smallWorldWindow.css';
import SearchBar from './SearchBar';
import { returnCardNames } from '../cardSearch';
import { returnImage } from '../cardSearch';
const SmallWorldWindow = ({ Text }) => {
  const[cardImage,setCardImage] = useState('');

  function handleSearch(text){
    setCardImage(returnImage(text))
  }
  
  let cardNames = returnCardNames()
  
  return (
  <div>
    <p className='windowID'>{Text}</p>
    <div className='cardWindow'>
    <SearchBar suggestions={cardNames} onSearch={handleSearch} />
    <img className='smallWorldImage' src={cardImage}></img>
    </div>
  </div>
  );
};

export default SmallWorldWindow;
