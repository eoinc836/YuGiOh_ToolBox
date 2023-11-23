const InfoIcons = ({ cardSubTypes, cardType, type, attr=None }) => {
    if (cardType == 'Spell' || cardType =='Trap'){
        return (
    <div class='infoIcons'>
        <img src={type}></img>
    </div>
  )};
    elif ('XYZ' in cardSubTypes)
    return (
        <div class='infoIcons'>
            <img src={attr}></img>
            <img src={type}></img>
        </div>
      )     
};



export default InfoIcons;
