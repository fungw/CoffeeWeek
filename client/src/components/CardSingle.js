import React from 'react';

const CardSingle = ({ hbcUser }) => {
  return (
    <div className="grow w-50 fl singleCard">
        <img className="roboHashImage" alt="hbcUser" src={`https://robohash.org/${hbcUser.guid}?200x200`}/>
        <div className="userCard">
          <h2>{hbcUser.name.first + " " + hbcUser.name.last}</h2>
          <p className="motto">{hbcUser.motto}</p>
          <p className="email">{hbcUser.email}</p>
          <p className="location department">{hbcUser.locationPretty} - {hbcUser.departmentPretty}</p>
        </div>
      </div>
  )
}

export default CardSingle;