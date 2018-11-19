import React from 'react';
import hbcLogo from '../images/hbcLogo.svg';

const Header = ({ weekDate }) => {
  const [ week, year ] = weekDate.split('-');
  return (
    <div>
      <div className="headerLine">
        <img id="hbcLogo" alt="hbcLogo" src={hbcLogo}/>
        <h1 className="f4" id="weekIndicator"><b>Week {week}</b> {year}</h1>
      </div>
      <div className="header tl flex flex-column">
        <h1 className="f1 w-40 title mv0">HBC Coffee Week</h1>
        <p>
          All of you can't start the day without a good coffee. 
          We create <b>HBC coffee sharing service</b>, a way to create new bonds with your collegues in your office.
          Each week you can surprise your work colleague with a coffee (and receive one as well!).
        </p>
        <p>
          <i>Check back each week as your coffee buddy changes!</i>
        </p>
      </div>
    </div>
  );
}

export default Header;