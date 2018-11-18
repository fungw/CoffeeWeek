import React from 'react';
import CardPair from './CardPair';
import CardSingle from './CardSingle';

const CardList = ({ hbcUsers, showFilter }) => {
  return (
      <div className="flex justify-center flex-wrap">
        {showFilter === 'SHOW-COFFEE' ? 
          hbcUsers.map((pairing, i) => {
            return (
              <CardPair giver={pairing[0]} key={i} receiver={pairing[1]}/>
            )
          }) :
          hbcUsers.map((user, i) => {
            return (
              <CardSingle hbcUser={user} key={i}/>
            )
          }) 
        }
      </div>
  );
}

export default CardList;