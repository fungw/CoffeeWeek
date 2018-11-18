import React from 'react';

const CardSingle = ({ hbcUser }) => {
  return (
    <div className="bg-light-red grow w-50 fl h-100 pa3">
        <img className="roboHashImage" alt="hbcUser" src={`https://robohash.org/${hbcUser.guid}?200x200`}/>
        <div className="userCard">
          <h2>{hbcUser.name.first + " " + hbcUser.name.last}</h2>
          <p className="motto">{hbcUser.motto}</p>
          <p className="email">{hbcUser.email}</p>
          <p className="location">{hbcUser.location}</p>
          <p className="department">{hbcUser.department}</p>
        </div>
      </div>
  )
}

export default CardSingle;