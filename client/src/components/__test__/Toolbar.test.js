import React from 'react'
import toolbarFilters from './data/toolbarFilter'
import Toolbar from '../Toolbar'
import { mount, shallow } from 'enzyme'

describe("Toolbar User", () => {
  let props;
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <Toolbar {...props}/>
      );
    }
    return mountedApp;
  }

  beforeEach(() => {
    props = {
      checkboxChange: function(){},
      filter: toolbarFilters,
      radioChange: function(){},
      searchChange: function(){}
    };
    mountedApp = undefined;
  });

  it("renders without crashing", () => {
    shallow(<Toolbar {...props}/>);
  });

  it("renders toolbar", () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});