import React from 'react'
import Header from '../Header'
import { mount, shallow } from 'enzyme'

describe("Header User", () => {
  let props;
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <Header {...props}/>
      );
    }
    return mountedApp;
  }

  beforeEach(() => {
    props = {
      weekDate: '46-2018'
    };
    mountedApp = undefined;
  });

  it("renders without crashing", () => {
    shallow(<Header {...props}/>);
  });

  it("renders user", () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});