import React from 'react'
import CardList from '../CardList'
import Users from './data/users.json'
import CoffeePairings from './data/pairings.json'
import { mount, shallow } from 'enzyme'

describe("CardList All Users", () => {
  let props;
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <CardList {...props}/>
      );
    }
    return mountedApp;
  }

  beforeEach(() => {
    props = {
      hbcUsers: Users,
      showFilter: 'SHOW-ALL'
    };
    mountedApp = undefined;
  });

  it("renders without crashing", () => {
    shallow(<CardList {...props}/>);
  });

  it("renders all users", () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});

describe("CardList Coffee Pairings", () => {
  let props;
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <CardList {...props}/>
      );
    }
    return mountedApp;
  }

  beforeEach(() => {
    props = {
      hbcUsers: CoffeePairings,
      showFilter: 'SHOW-COFFEE'
    };
    mountedApp = undefined;
  });

  it("renders without crashing", () => {
    shallow(<CardList {...props}/>);
  });

  it("renders coffee pairs", () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});