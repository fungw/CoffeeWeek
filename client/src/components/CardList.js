import React from 'react';
import CardPair from './CardPair';
import CardSingle from './CardSingle';
import _ from 'lodash';

const CardList = ({ coffeeUsers, showFilter }) => {
  return (
      <div id="cardList">
        {showFilter === 'SHOW-COFFEE' ? 
          coffeeUsers.map((pairing, i) => {
            pairing[0].locationPretty = prettifyLocationName(pairing[0].location);
            pairing[1].locationPretty = prettifyLocationName(pairing[1].location);
            pairing[0].departmentPretty = toCamelCase(pairing[0].department);
            pairing[1].departmentPretty = toCamelCase(pairing[1].department);
            return (
              <CardPair giver={pairing[0]} key={i} receiver={pairing[1]}/>
            )
          }) :
          coffeeUsers.map((user, i) => {
            user.locationPretty = prettifyLocationName(user.location);
            user.departmentPretty = toCamelCase(user.department);
            return (
              <CardSingle coffeeUser={user} key={i}/>
            )
          }) 
        }
      </div>
  );
}

function toCamelCase(string) {
  let strSplit = string.split(" ");
  let result = '';
  _.each(strSplit, function(str) {
    result += str.charAt(0).toUpperCase() + str.slice(1) + ' ';
  });
  return result;
}

function prettifyLocationName(location) {
  let prettify;
  switch (location) {
    case "dub":
      prettify = "Dublin";
      break;
    case "ny":
      prettify = "New York";
      break;
    default:
      prettify = location;
      break;
  }
  return prettify;
}

export default CardList;