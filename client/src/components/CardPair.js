import React from 'react';

const Card = ({ giver, receiver }) => {
    return (
        <div className="cardPair">
          <div className="grow w-50 fl giverCard">
            <img className="roboHashImage" alt="hbcUsers" src={`https://robohash.org/${giver.guid}?200x200`}/>
            <div className="userCard">
              <h2>{giver.name.first + " " + giver.name.last}</h2>
              <p className="motto">{giver.motto}</p>
              <p className="email">{giver.email}</p>
              <p className="location department">{giver.locationPretty} - {giver.departmentPretty}</p>
            </div>
            <div className="giverLabel">
              Giver
            </div>
          </div>
          <div className="grow w-50 fl receiverCard">
            <img className="roboHashImage" alt="hbcUsers" src={`https://robohash.org/${receiver.guid}?200x200`}/>
            <div className="userCard">
              <h2>{receiver.name.first + " " + receiver.name.last}</h2>
              <p className="motto">{receiver.motto}</p>
              <p className="email">{receiver.email}</p>
              <p className="location department">{receiver.locationPretty} - {receiver.departmentPretty}</p>
            </div>
            <div className="receiverLabel">
              Receiver
            </div>
          </div>
        </div>
    )
}

export default Card;