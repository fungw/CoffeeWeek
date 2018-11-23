import React from 'react';

const Scroll = (props) => {
  return (
    <div className="scrollContent">
        {props.children}
    </div>
  )
}

export default Scroll;