import React from 'react'
import CardPair from '../CardPair'
import singleUser_1 from './data/singleUser_1.json'
import singleUser_2 from './data/singleUser_2.json'
import { mount, shallow } from 'enzyme'

describe("CardPair Users", () => {
  let props;
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <CardPair {...props}/>
      );
    }
    return mountedApp;
  }

  beforeEach(() => {
    props = {
      giver: singleUser_1,
      receiver: singleUser_2
    };
    mountedApp = undefined;
  });

  it("renders without crashing", () => {
    shallow(<CardPair {...props}/>);
  });

  it("renders users pair", () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});