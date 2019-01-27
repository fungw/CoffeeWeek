import React from 'react';

const Header = ({ weekDate }) => {
  const [ week, year ] = weekDate.split('-');
  return (
    <div>
      <div className="banner">
        <h1 id="weekDisplay"><b>Week {week}</b> {year}</h1>
      </div>
      <div className="descriptionContainer">
        <h1>Coffee Week</h1>
        <p>
          All of you can't start the day without a good coffee. 
          We create <b>coffee sharing service</b>, a way to create new bonds with your collegues in your office.
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