// SmallWorld.js
import React, { useState } from 'react';
import SmallWorldWindow from './smallWorldWindow/smallWorldWindow';
const SmallWorld = () => {
  const [smallWorldDict,setSmallWorldDict] = useState({})
  return (
    <div>
      <div className="windowContainer">
        <SmallWorldWindow Text = 'Reveal'/>
        <SmallWorldWindow Text = 'Show'/>
        <SmallWorldWindow Text = 'Add'/>
      </div>
    </div>
  );
};

export default SmallWorld;
