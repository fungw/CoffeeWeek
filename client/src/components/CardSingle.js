import React from 'react';

const CardSingle = ({ hbcUser }) => {
  return (
    <div className="grow singleCard">
        <img className="roboHashImage" alt="hbcUser" src={`https://robohash.org/${hbcUser.guid}?200x200`}/>
        <div className="userCard">
          <h2>{hbcUser.name.first + " " + hbcUser.name.last}</h2>
          <p className="motto">{hbcUser.motto}</p>
          <p>{hbcUser.email}</p>
          <p>{hbcUser.locationPretty} - {hbcUser.departmentPretty}</p>
        </div>
      </div>
  )
}

export default CardSingle;