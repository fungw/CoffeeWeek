import React from 'react';

const Toolbar = ({ checkboxChange, radioChange, searchChange, filter }) => {
  return (
    <div className="toolbar">
      <div className="flex flex-column flex-grow-1">
        <form className="flex flex-row flex-grow-1">
          <div className="flex-grow-1">
            <legend className="b tl">Show</legend>
            <div className="flex flex-row">
              <div className="radioGroup">
                <input className="mr2" type="radio" id="show-all" name="mainFilter" value="show-all" onChange={radioChange}/>
                <label className="lh-copy" htmlFor="show-all">All Users</label>
              </div>
              <div className="radioGroup">
                <input className="mr2" type="radio" id="show-coffee" name="mainFilter" value="show-coffee" defaultChecked={true} onChange={radioChange}/>
                <label className="lh-copy" htmlFor="show-coffee">Coffee List</label>
              </div>
            </div>
          </div>
          <div className="flex-grow-1">
            <legend className="b tl">Department</legend>
            <div className="flex flex-row">
              <div className="checkboxGroup">
                <input className="mr2" type="checkbox" id="engineering" value="department.engineering" checked={filter['department']['engineering']} onChange={checkboxChange}/>
                <label className="lh-copy" htmlFor="engineering">Engineering</label>
              </div>
              <div className="checkboxGroup">
                <input className="mr2" type="checkbox" id="humanResources" value="department.humanResources" checked={filter['department']['humanResources']} onChange={checkboxChange}/>
                <label className="lh-copy" htmlFor="humanResources">Human Resources</label>
              </div>
            </div>
          </div>
          <div className="flex-grow-1">
            <legend className="b tl">Location</legend>
            <div className="flex flex-row">
              <div className="checkboxGroup">
                <input className="mr2" type="checkbox" id="dublin" value="location.dub" checked={filter['location']['dub']} onChange={checkboxChange}/>
                <label className="lh-copy" htmlFor="dublin">Dublin</label>
              </div>
              <div className="checkboxGroup">
                <input className="mr2" type="checkbox" id="newYork" value="location.ny" checked={filter['location']['ny']} onChange={checkboxChange}/>
                <label className="lh-copy" htmlFor="newYork">New York</label>
              </div>
            </div>
          </div>
        </form>
        <div className="flex-grow-1" id="searchBox">
            <input
              className="pa3 ba flex-grow-1"
              type="search" 
              placeholder="search colleagues by name or by department, location, phone, motto e.g. motto:decentralized" 
              onChange={searchChange}
            />
          </div>
      </div>
    </div>
  );
}

export default Toolbar;