import React, { useState } from 'react';
import './Search.css';
import DraggableOperator from './draggableComponents/draggableOperator';
import DraggableCardType from './draggableComponents/draggableCardType';
import DraggableAtkValue from './draggableComponents/draggableAtkValue';
import DraggableDefValue from './draggableComponents/draggableDefValue';
import DraggableLevel from './draggableComponents/draggableLevel';
import DroppableArea from './droppableArea/droppableArea';
import DraggableCardMaterials from './draggableComponents/draggableMaterials';
import DraggableSpellSubType from './draggableComponents/draggableSpellSubtype';
import DraggableTrapSubType from './draggableComponents/draggableTrapSubType';
import CardInfoArea from './cardInfoArea/cardInfoArea';
import DraggableCardName from './draggableComponents/draggableName';
import DraggableCardDesc from './draggableComponents/draggableDesc';
import DraggableAttribute from './draggableComponents/draggableAttribute';
import DraggableType from './draggableComponents/draggableType';
import DraggableMonsterSubType from './draggableComponents/draggableMonsterSubtype';
import DraggableScale from './draggableComponents/draggableScale';
import DraggableRank from './draggableComponents/draggableRank';
import DraggableLinkRating from './draggableComponents/draggableLinkRating';
import DraggableLinkArrows from './draggableComponents/draggableLinkArrows';
import { performSearch} from './cardSearch';
const Search = () => {
  const [numberOfBoxes, setNumberOfBoxes] = useState(0);
  const [boxItems, setBoxItems] = useState(Array(numberOfBoxes).fill({ objectType: '', value: '', equals: false }));
  const [returnedCards, setReturnedCards] = useState()

  const increaseBoxes = () => {
    // Function to increment the number of boxes
    setNumberOfBoxes(numberOfBoxes + 1);
    setBoxItems((prevBoxItems) => [...prevBoxItems, []]); // Add an empty boxItems array
    console.log(boxItems)
  };

  const decreaseBoxes = () => {
    // Function to decrement the number of boxes (minimum 1 box)
    if (numberOfBoxes > 1) {
      setNumberOfBoxes(numberOfBoxes - 1);
      setBoxItems((prevBoxItems) => prevBoxItems.slice(0, numberOfBoxes - 1)); // Remove the last boxItems array
    }
  }


  const startSearch = async () => {
    console.log(boxItems)
    try {
      let results = await performSearch(boxItems);
      setReturnedCards(results);
    } catch (error) {
      console.error("Error during search:", error);
    } 
  };
  


  return (

    <div className="app">
    <div>
      {returnedCards ? (
        <p className='totalCards'>{returnedCards.length} Matching Cards</p>
      ) : (
        <></>
      )}
    </div>
    <CardInfoArea returnedCards={returnedCards}/>
    <DroppableArea numberOfBoxes={numberOfBoxes} boxItems={boxItems} setBoxItems={setBoxItems} />
    <div className="draggable-grid">
    <div className="types-row">
      <DraggableCardType  increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element" />
      <DraggableMonsterSubType increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element"/>
      <DraggableSpellSubType increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element" />
      <DraggableTrapSubType increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element" />
      <DraggableAttribute increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element" />
      <DraggableType increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element" />
      <DraggableAtkValue  increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element"  />
      <DraggableDefValue  increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element" />
      <DraggableCardName  increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element" />
      <DraggableCardDesc  increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element" />
      <DraggableCardMaterials increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element" />
      <DraggableLevel increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element"  />
      <DraggableRank increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element"/>
      <DraggableScale increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element"/>
      <DraggableLinkRating increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element"/>
      <DraggableLinkArrows increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} className="draggable-element"/>
    </div>
    <div className="operators-row">
      <DraggableOperator increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} text="(" />
      <DraggableOperator increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} text=")" />
      <DraggableOperator increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} text="AND" />
      <DraggableOperator increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} text="OR" />
      <DraggableOperator increaseBoxes = {increaseBoxes}  boxItems={boxItems} setBoxItems={setBoxItems} text="XOR" />
    </div>
  </div>
  <div className="button-area">
    <button onClick={increaseBoxes}>Add</button>
    <button onClick={decreaseBoxes}>Remove</button>
    <button onClick={startSearch}>Search</button>
  </div>
</div>

  

  );
};

export default Search;

