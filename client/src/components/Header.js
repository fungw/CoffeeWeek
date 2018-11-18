import React from 'react';

const Header = ({ weekDate }) => {
  const [ week, year ] = weekDate.split('-');
  return (
    <div className="header flex justify-center flex-wrap">
      <h1 className="f1 w-40 title mr2">HBC Coffee Week</h1>
      {/* <h1 className="f1 tc" id="divider"></h1> */}
      <h1 className="f3 w-40 ml2" id="weekIndicator">Week {week} {year}</h1>
    </div>
  );
}

export default Header;