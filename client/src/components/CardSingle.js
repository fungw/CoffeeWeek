import React from 'react';

const CardSingle = ({ coffeeUser }) => {
  console.log(coffeeUser);
  return (
    <div className="grow singleCard">
        <img className="roboHashImage" alt="user" src={`https://robohash.org/${coffeeUser.guid}?200x200`}/>
        <div className="userCard">
          <h2>{coffeeUser.name.first + " " + coffeeUser.name.last}</h2>
          <p className="motto">{coffeeUser.motto}</p>
          <p>{coffeeUser.email}</p>
          <p>{coffeeUser.locationPretty} - {coffeeUser.departmentPretty}</p>
        </div>
      </div>
  )
}

export default CardSingle;