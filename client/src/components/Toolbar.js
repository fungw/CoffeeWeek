import React from 'react';

const Toolbar = ({ checkboxChange, radioChange, searchChange, filter }) => {
  return (
    <div id="flex flex-row">
      <div className="pa2 flex flex-row flex-grow-1 mh6">
        <h3 className="flex-grow-1 b">Show filter:</h3>
        <form className="flex flex-row flex-grow-1">
          <div className="flex-grow-1">
            <div className="flex flex-column">
              <div className="flex-grow-1 tl">
                <input className="mr2" type="radio" id="show-all" name="mainFilter" value="show-all" onChange={radioChange}/>
                <label className="lh-copy">Show All Users</label>
              </div>
              <div className="flex-grow-1 tl">
                <input className="mr2" type="radio" id="show-coffee" name="mainFilter" value="show-coffee" defaultChecked={true} onChange={radioChange}/>
                <label className="lh-copy">Show Coffee List</label>
              </div>
            </div>
          </div>
          <div className="flex-grow-1">
            <legend className="b">Department</legend>
            <div className="flex flex-row">
              <div className="flex-grow-1">
                <input className="mr2" type="checkbox" id="engineering" value="department.engineering" checked={filter['department']['engineering']} onChange={checkboxChange}/>
                <label className="lh-copy">Engineering</label>
              </div>
              <div className="flex-grow-1">
                <input className="mr2" type="checkbox" id="humanResources" value="department.humanResources" checked={filter['department']['humanResources']} onChange={checkboxChange}/>
                <label className="lh-copy">Human Resources</label>
              </div>
            </div>
          </div>
          <div className="flex-grow-1">
            <legend className="b">Location</legend>
            <div className="flex flex-row">
              <div className="flex-grow-1">
                <input className="mr2" type="checkbox" id="dublin" value="location.dub" checked={filter['location']['dub']} onChange={checkboxChange}/>
                <label className="lh-copy">Dublin</label>
              </div>
              <div className="flex-grow-1">
                <input className="mr2" type="checkbox" id="newYork" value="location.ny" checked={filter['location']['ny']} onChange={checkboxChange}/>
                <label className="lh-copy">New York</label>
              </div>
            </div>
          </div>
        </form>
        <div className="pa2 flex-grow-1">
            <input 
              className="pa3 ba b--green bg-lightest-blue flex-grow-1"
              type="search" 
              placeholder="motto:emulation" 
              onChange={searchChange}
            />
          </div>
      </div>
    </div>
  );
}

export default Toolbar;