import React from 'react'
import App from './App'
import { mount, shallow } from 'enzyme'

describe("App", () => {
  let mountedApp;
  const app = () => {
    if (!mountedApp) {
      mountedApp = mount(
        <App />
      );
    }
    return mountedApp;
  }

  beforeEach(() => {
    mountedApp = undefined;
  });

  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("always renders a div", () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });
});