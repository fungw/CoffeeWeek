import React from 'react';

const Toolbar = ({ checkboxChange, radioChange, searchChange, filter }) => {
  return (
    <div className="toolbar">
      <div>
        <form>
          <div>
            <legend>Show</legend>
            <div>
              <div className="radioGroup">
                <input type="radio" id="show-all" name="mainFilter" value="show-all" onChange={radioChange}/>
                <label htmlFor="show-all">All Users</label>
              </div>
              <div className="radioGroup">
                <input type="radio" id="show-coffee" name="mainFilter" value="show-coffee" defaultChecked={true} onChange={radioChange}/>
                <label htmlFor="show-coffee">Coffee List</label>
              </div>
            </div>
          </div>
          <div>
            <legend>Department</legend>
            <div>
              <div className="checkboxGroup">
                <input type="checkbox" id="engineering" value="department.engineering" checked={filter['department']['engineering']} onChange={checkboxChange}/>
                <label htmlFor="engineering">Engineering</label>
              </div>
              <div className="checkboxGroup">
                <input type="checkbox" id="humanResources" value="department.humanResources" checked={filter['department']['humanResources']} onChange={checkboxChange}/>
                <label htmlFor="humanResources">Human Resources</label>
              </div>
            </div>
          </div>
          <div>
            <legend>Location</legend>
            <div>
              <div className="checkboxGroup">
                <input type="checkbox" id="dublin" value="location.dub" checked={filter['location']['dub']} onChange={checkboxChange}/>
                <label htmlFor="dublin">Dublin</label>
              </div>
              <div className="checkboxGroup">
                <input type="checkbox" id="newYork" value="location.ny" checked={filter['location']['ny']} onChange={checkboxChange}/>
                <label htmlFor="newYork">New York</label>
              </div>
            </div>
          </div>
        </form>
        <div id="searchBox">
            <input
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