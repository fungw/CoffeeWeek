import React, { Component } from 'react';
import CardList from '../components/CardList';
import Header from '../components/Header';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
import Toolbar from '../components/Toolbar';
import Scroll from '../components/Scroll';
import _ from 'lodash';
import './App.sass';

class App extends Component {

  constructor() {
    super();
    this.SHOWALL = 'SHOW-ALL';
    this.SHOWCOFFEE = 'SHOW-COFFEE';
    this.state = {
      filter: { 
        department: {
          engineering: true, 
          humanResources: false
        },
        location: {
          dub: true,
          ny: true 
        }
      },
      response: '',
      searchField: '',
      showFilter: this.SHOWCOFFEE,
      weekDate: ''
    }
  }

  componentDidMount() {
    this.fetchCoffeeList()
      .then(res => this.setState({ response: res.coffeeUserList }))
      .catch(err => console.log(err));
    this.fetchWeekDate()
      .then(res => this.setState({ weekDate: res.weekDate }))
      .catch(err => console.log(err));
  }

  fetchAllUsers = async () => {
    nprogress.start();
    const response = await fetch('/api/fetchAllUsers');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    nprogress.done();
    return body;
  }

  fetchCoffeeList = async () => {
    nprogress.start();
    const response = await fetch('/api/fetchCoffeeList');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    nprogress.done();
    return body;
  }

  fetchWeekDate = async () => {
    const response = await fetch('/api/fetchWeekDate');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  /**
   * filterOptions()
   * - filter selection options that are selected
   */
  filterOptions = () => {
    let { filter } = this.state;
    let positiveFilters = {};
    let keys = Object.keys(filter);
    // construct empty clone of filters
    _.each(keys, function(key) {
      positiveFilters[key] = {};
    });
  
    for (var key in filter) {
      // omit fitters that are false
      positiveFilters[key] = _.omitBy(filter[key], function(omitValue) {
        return omitValue === false;
      });
      // slight amendment to humanResources string
      if (positiveFilters[key]['humanResources']) {
        positiveFilters[key]['human resources'] = positiveFilters[key]['humanResources'];
      }
    }
    return positiveFilters;
  }

  onCheckboxChange = (event) => {
    var checkboxValue = event.target.value.split('.');
    let filterItems = {...this.state.filter};
    filterItems[checkboxValue[0]][checkboxValue[1]] = event.target.checked;
    this.setState({ filter: filterItems });
  }
  
  onRadioChange = async (event) => {
    if ((event.target.value).toUpperCase() === this.SHOWALL) {
      this.fetchAllUsers()
        .then(res => this.setState({ response: res.allUsers, showFilter: this.SHOWALL, 
          filter: { 
            department: {
              engineering: true, 
              humanResources: true
            },
            location: {
              dub: true,
              ny: true 
            }
          }
        })).catch(err => console.log(err));
    } else if ((event.target.value).toUpperCase() === this.SHOWCOFFEE) {
      this.fetchCoffeeList()
        .then(res => this.setState({ response: res.coffeeUserList, showFilter: this.SHOWCOFFEE,
          filter: { 
            department: {
              engineering: true, 
              humanResources: false
            },
            location: {
              dub: true,
              ny: true 
            }
          } 
        })).catch(err => console.log(err));
    }
  }
  
  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  }

  render() {
    const { filter, response, showFilter, weekDate } = this.state;
    let filteredUsers;

    if (showFilter === this.SHOWCOFFEE) {
      filteredUsers = this.pairSearchFilter();
      filteredUsers = this.pairFilterOptions(filteredUsers);
    } else {
      filteredUsers = this.userSearchFilter();
      filteredUsers = this.userFilterOptions(filteredUsers);
    }

    return (!response.length ? 
      <div className="app-div">
        <Header weekDate={weekDate}></Header>
        <h1 className="loading">Loading</h1>
      </div>
      :
      <div className="app-div">
        <Header weekDate={weekDate}></Header>
        <div className="contentContainer">
          <Toolbar searchChange={this.onSearchChange} checkboxChange={this.onCheckboxChange} radioChange={this.onRadioChange} filter={filter}/>
          <Scroll>
            <CardList coffeeUsers={filteredUsers} showFilter={showFilter}></CardList>
          </Scroll>
        </div>
      </div>
    )
  }

  /**
   * searchBoxParse()
   * - parse the query in the search box
   */
  searchBoxParse = (searchQuery, user, searchField) => {
    try {
      if ((searchQuery.length === 2) && (user[searchQuery[0]]) && (searchQuery[1])) {
        return (user[searchQuery[0]].toLowerCase().includes(searchQuery[1].toLowerCase()));
      } else {
        return (user.name.first.toLowerCase().includes(searchField.toLowerCase())) 
          || (user.name.last.toLowerCase().includes(searchField.toLowerCase()));
      }
    } catch(e) {
      console.log(e);
    }
  }

  /**
   * pairFilterOptions
   * - filter coffee pairings from selection options in toolbar
   */
  pairFilterOptions = (userListPair) => {
    let filteredUsers = [];
    let match;
    let positiveFilters = this.filterOptions();
    let userList = userListPair;

    userList.forEach(function(userPair) {
      match = true;
      userPair.forEach(function(user) {
        for (var key in positiveFilters) {
          // if either of users' information matches the filters selected, match.
          // also match when either of the filter groups (location/department)
          // are empty as we don't want to return nothing
          if (!_.includes(Object.keys(positiveFilters[key]), user[key]) 
            && (Object.keys(positiveFilters[key]).length !== 0)) {
            match = false;
          }
        }
      });
      if (match) {
        filteredUsers.push(userPair);
      }
    });
    return filteredUsers;
  }

  /**
   * pairSearchFilter()
   * - filter coffee pairings from query in search box
   */
  pairSearchFilter = () => {
    const { searchField, response } = this.state;
    let filteredUsers = [];
    let searchQuery = searchField.split(':');
    let userPair;
    for (let i=0; i<response.length; i++) {
      userPair = response[i].filter(user => {
        return this.searchBoxParse(searchQuery, user, searchField);
      });
      if (userPair.length !== 0) {
        filteredUsers.push(response[i]);
      }
    }
    return filteredUsers;
  }

  /**
   * userFilterOptions()
   * - filter all users from the selection options in toolbar
   */
  userFilterOptions = (userListSingle) => {
    let filteredUsers = [];
    let positiveFilters = this.filterOptions();
    let userList = userListSingle;
    let match;

    userList.forEach(function(user) {
      match = true;
      for (var key in positiveFilters) {
        // if users' information matches the filters selected, match.
        // also match when either of the filter groups (location/department)
        // are empty as we don't want to return nothing
        if (!_.includes(Object.keys(positiveFilters[key]), user[key])
          && (Object.keys(positiveFilters[key]).length !== 0)) {
          match = false;
        }
      }
      if (match) {
        filteredUsers.push(user);
      }
    });
    return filteredUsers;
  }

  /**
   * userSearchFilter()
   * - filter all users from query in search box
   */
  userSearchFilter = () => {
    const { searchField, response } = this.state;
    let searchQuery = searchField.split(':');
    return response.filter(user => {
      return this.searchBoxParse(searchQuery, user, searchField);
    });
  }
}

export default App;
