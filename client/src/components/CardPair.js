import React from 'react';

const Card = ({ giver, receiver }) => {
    return (
        <div className="bg-light-green w-40 pa3 mr2 ma2">
          <div className="bg-light-red grow w-50 fl h-100 pa3">
            <img className="roboHashImage" alt="hbcUsers" src={`https://robohash.org/${giver.guid}?200x200`}/>
            <div className="userCard">
              <h2>{giver.name.first + " " + giver.name.last}</h2>
              <p className="motto">{giver.motto}</p>
              <p className="email">{giver.email}</p>
              <p className="location">{giver.location}</p>
              <p className="department">{giver.department}</p>
            </div>
          </div>
          <div className="bg-blue grow w-50 fl h-100 pa3">
            <img className="roboHashImage" alt="hbcUsers" src={`https://robohash.org/${receiver.guid}?200x200`}/>
            <div className="userCard">
              <h2>{receiver.name.first + " " + receiver.name.last}</h2>
              <p className="motto">{receiver.motto}</p>
              <p className="email">{receiver.email}</p>
              <p className="location">{receiver.location}</p>
              <p className="department">{receiver.department}</p>
            </div>
          </div>
        </div>
    )
}

export default Card;