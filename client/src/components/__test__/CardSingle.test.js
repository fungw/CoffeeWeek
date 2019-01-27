import React from 'react'
import CardSingle from '../CardSingle'
import singleUser from './data/singleUser_1.json'
import { mount, shallow } from 'enzyme'

describe("CardSingle User", () => {
  let props;
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <CardSingle {...props}/>
      );
    }
    return mountedApp;
  }

  beforeEach(() => {
    props = {
      users: singleUser
    };
    mountedApp = undefined;
  });

  it("renders without crashing", () => {
    shallow(<CardSingle {...props}/>);
  });

  it("renders user", () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});