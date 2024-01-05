
import data from './data.json';

class cardBase {
    constructor(cards = []) {
        this.cards = cards;
    }
    addCard(card) {
        this.cards.push(card);
    }
}

class Card {
    constructor(name, cardType, cardSubTypes, desc, image, options = {}) {
        this.name = name;
        this.cardType = cardType;
        this.cardSubTypes = cardSubTypes;
        this.desc = desc;
        this.image = image;
        this.attack = options.attack !== undefined ? options.attack : null;
        this.defence = options.defence !== undefined ? options.defence : null;
        this.materials = options.materials !== undefined ? options.materials : null;
        this.lvl = options.lvl !== undefined ? options.lvl : null;
        this.rank = options.rank !== undefined ? options.rank : null;
        this.linkRating =  options.linkRating !== undefined ? options.linkRating : null;
        this.attr =  options.attr !== undefined ? options.attr : null;
        this.monsterType =  options.monsterType !== undefined ? options.monsterType : null;
        this.scale =  options.scale !== undefined ? options.scale : null;
        this.linkMarkers =  options.linkMarkers !== undefined ? options.linkMarkers : null;
    }
}

function addAllCards(cardBase) {
    let i = 0;
    while (i < 12759) {
        let newCard = data['data'][i];
        if (newCard['type'] === 'Spell Card') {
            let name = newCard['name'];
            let image = newCard['card_images'][0]['image_url'];
            let cardType = 'Spell';
            let cardSubTypes = newCard['race'];
            let desc = newCard['desc'];
            let card = new Card(name, cardType, cardSubTypes, desc, image);
            cardBase.addCard(card);
        } else if (newCard['type'] === 'Trap Card') {
            let name = newCard['name'];
            let image = newCard['card_images'][0]['image_url'];
            let cardType = 'Trap';
            let cardSubTypes = newCard['race'];
            let desc = newCard['desc'];
            let card = new Card(name, cardType, cardSubTypes, desc, image);
            cardBase.addCard(card);
        } else if (newCard['type'].includes('Monster')) {
            let name = newCard['name'];
            let image = newCard['card_images'][0]['image_url'];
            let cardType = 'Monster';
            let cardSubTypes = newCard['type'].split(' ');
            cardSubTypes = cardSubTypes.map(subType => subType.replace('Monster', '').trim());
            let attack = newCard['atk'];
            let attr = newCard['attribute'];
            let monsterType = newCard['race'];
            let desc = newCard['desc'];
            let scale = null;
            if (cardSubTypes[0].includes('Pendulum')) {
                scale = newCard['scale'];
            }
           
            if (cardSubTypes[0].includes('Link')) {
                let materials = newCard['desc'].split('\n')[0];
                let linkMarkersOriginal = newCard['linkmarkers'];
                let linkMarkers = [];
                for (let marker of linkMarkersOriginal) {
                    if (marker === 'Top-Right') {
                        linkMarkers.push('TopRight');
                    } else if (marker === 'Top-Left') {
                        linkMarkers.push('TopLeft');
                    } else if (marker === 'Bottom-Left') {
                        linkMarkers.push('BottomLeft');
                    } else if (marker === 'Bottom-Right') {
                        linkMarkers.push('BottomRight');
                    } else {
                        linkMarkers.push(marker);
                    }
                }
                if (materials.includes("\r")) {
                    materials = materials.replace("\r", "");
                }
                let linkRating = newCard['linkval'];
                let card = new Card(name, cardType, cardSubTypes, desc, image, {
                    attack: attack,
                    materials: materials,
                    linkRating: linkRating,
                    attr: attr,  // Make sure to include 'attr' in the options object
                    monsterType: monsterType,
                    scale: scale,
                    linkMarkers: linkMarkers
                });
                cardBase.addCard(card);
                
                
            } else {
                let defence = newCard['def'];
                if (cardSubTypes[0].includes('XYZ')) {
                    let materials = newCard['desc'].split('\n')[0];
                    if (materials.includes("\r")) {
                        materials = materials.replace("\r", "");
                    }
                    let rank = newCard['level'];
                    let card = new Card(name, cardType, cardSubTypes, desc, image, {
                        attack: attack,
                        defence:defence,
                        materials: materials,
                        attr: attr,  // Make sure to include 'attr' in the options object
                        monsterType: monsterType,
                        scale: scale,
                        rank:rank,
                        
                    });
                    cardBase.addCard(card);
                } else if (cardSubTypes[0].includes('Fusion')) {
                    let materials = newCard['desc'].split('\n')[0];
                    if (materials.includes("\r")) {
                        materials = materials.replace("\r", "");
                    }
                    let lvl = newCard['level'];
                    let card = new Card(name, cardType, cardSubTypes, desc, image, {
                        attack: attack,
                        defence:defence,
                        materials: materials,
                        attr: attr,  // Make sure to include 'attr' in the options object
                        monsterType: monsterType,
                        scale: scale,
                        lvl: lvl
                    });
                    cardBase.addCard(card);
                } else {
                    let lvl = newCard['level'];
                    let card = new Card(name, cardType, cardSubTypes, desc, image, {
                        attack: attack,
                        defence:defence,
                        attr: attr,  // Make sure to include 'attr' in the options object
                        monsterType: monsterType,
                        scale: scale,
                        lvl: lvl
                    });
      
                    cardBase.addCard(card);
                }
            }
        }
        i += 1;
    }
}

function handleAtkDefSearch(cardValue, searchRange) {
    let parts = searchRange.split('<=');
    let maxValue = parseInt(parts[parts.length - 1], 10);
    let minValue = parseInt(parts[0], 10);
    return minValue <= cardValue && cardValue <= maxValue;
}

function search_database(cardBase, criteria, equals = null) {
    let result_set = [];
    for (let card of cardBase.cards) {
        if (evaluate_criteria(card, criteria, equals)) {
            result_set.push([card.name, card.image, card.desc, card.cardType, card.attack, card.defence, card.cardSubTypes]);
        }
    }
    
    return result_set.sort();
}

function evaluate_criteria(obj, criteria, equals) {
    if ('operator' in criteria) {
        if (criteria['operator'] === 'AND') {
            let left_result = evaluate_criteria(obj, criteria['left'] || {}, null);
            let right_result = evaluate_criteria(obj, criteria['right'] || {}, null);
            return left_result && right_result;
        } else if (criteria['operator'] === 'OR') {
            let left_result = evaluate_criteria(obj, criteria['left'] || {}, null);
            let right_result = evaluate_criteria(obj, criteria['right'] || {}, null);
            return left_result || right_result;
        } else if (criteria['operator'] === 'XOR') {
            let left_result = evaluate_criteria(obj, criteria['left'] || {}, null);
            let right_result = evaluate_criteria(obj, criteria['right'] || {}, null);
            return left_result ^ right_result;
        }
    } else {
        let attribute = criteria['attribute'];
        let value = criteria['value'];

        if (attribute === 'AtkValue' && obj.attack != null) {
            return handleAtkDefSearch(obj.attack, value);
        } else if (attribute === 'DefValue' && obj.defence != null) {
            return handleAtkDefSearch(obj.defence, value);
        }

        if ((attribute === 'name' || attribute === 'desc' || attribute === 'materials') && obj[attribute] != null) {
            if (equals === true) {
                let obj_value = obj[attribute];
                return obj_value === value;
            } else {
                let obj_value = obj[attribute];
                return obj_value.includes(value);
            }
        }

        if (attribute === 'lvl' || attribute === 'scale' || attribute === 'rank' || attribute === 'linkRating') {
            let obj_value = obj[attribute];
            if (obj[attribute] != null) {
                return value.includes(obj_value.toString());
            }
        }

        if (attribute === 'linkMarkers' && obj[attribute] != null) {
            let obj_value = obj[attribute];
            let arrowFound = false;
            for (let arrow of value) {
                if (obj_value.includes(arrow)) {
                    arrowFound = true;
                }
            }
            return arrowFound;
        }

        if (attribute.includes('CardSubTypes')) {
            let searchCardType = '' ;
            if(attribute.includes('trap')){
                searchCardType = 'Trap'
            }
            if(attribute.includes('spell')){
                searchCardType = 'Spell'
            }
            if(attribute.includes('monster')){
                searchCardType = 'Monster'
            }
            let obj_value = obj['cardSubTypes'];
            let obj_cardType = obj['cardType']
            let subTypeFound = false;
            if (typeof obj_value === 'string') {
                return obj_value === value && searchCardType === obj_cardType;
            } else {
                for (let subType of obj_value) {
                    if (value === subType  && searchCardType === obj_cardType) {
                        subTypeFound = true;
                    }
                }
            }
            return subTypeFound;
        } else if (attribute != null && obj.hasOwnProperty(attribute)) {
            let obj_value = obj[attribute];
            return obj_value === value;
        } else {
            return false;
        }
    }
}

let cardbase = new cardBase();
addAllCards(cardbase);

function convert_to_criteria(search_conditions) {
    let stack = [];
    let operator_stack = [];
    for (let condition of search_conditions) {
        if (condition['objectType'] === 'operator') {
            if (condition['value'] === '(') {
                operator_stack.push('(');
            } else if (condition['value'] === ')') {
                while (operator_stack.length && operator_stack[operator_stack.length - 1] !== '(') {
                    let operator = operator_stack.pop();
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push({
                        'operator': operator,
                        'left': left,
                        'right': right
                    });
                }
                if (operator_stack.length && operator_stack[operator_stack.length - 1] === '(') {
                    operator_stack.pop();
                }
            } else {
                while (operator_stack.length && precedence(operator_stack[operator_stack.length - 1]) >= precedence(condition['value'])) {
                    let operator = operator_stack.pop();
                    let right = stack.pop();
                    let left = stack.pop();
                    stack.push({
                        'operator': operator,
                        'left': left,
                        'right': right
                    });
                }
                operator_stack.push(condition['value']);
            }
        } else {
            stack.push({
                'attribute': condition['objectType'],
                'value': condition['value']
            });
        }
    }

    while (operator_stack.length) {
        let operator = operator_stack.pop();
        let right = stack.pop();
        let left = stack.pop();
        stack.push({
            'operator': operator,
            'left': left,
            'right': right
        });
    }
    console.log(stack[0],'stack')
    return stack[0];
}

function precedence(operator) {
    if (operator === 'AND' || operator === 'OR' || operator === 'XOR') {
        return 1;
    }
    return 0;
}


export function returnCardNames(){
    let names = []
    for (let card of cardbase.cards)
    if (card.cardType === 'Monster'){
        if (card.cardSubTypes[0].includes('Link') ||card.cardSubTypes[0].includes('XYZ') || card.cardSubTypes[0].includes('Fusion') || card.cardSubTypes[0].includes('Synchro')){
            //pass
        }
        else{
            names.push(card.name)
        }
    }
    return(names)
}


export function performSearch(boxItems){
    let criteria = convert_to_criteria(boxItems)
    let results = search_database(cardbase,criteria,boxItems[0]['equals'])
    
    return results
    
}

export function returnImage(cardName){
    const correctCard = cardbase.cards.find(obj => obj.name === cardName);
    return(correctCard.image)
}