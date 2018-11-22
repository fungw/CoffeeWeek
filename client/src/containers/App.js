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

  componentWillMount () {
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

  filterSearchAllUsers = () => {
    const { searchField, response } = this.state;
    let searchQuery = searchField.split(':');
    return response.filter(user => {
      return this.searchFilter(searchQuery, user, searchField);
    });
  }

  filterSearchUser = () => {
    const { searchField, response } = this.state;
    let filteredUsers = [];
    let searchQuery = searchField.split(':');
    let userPair;
    for (let i=0; i<response.length; i++) {
      userPair = response[i].filter(user => {
        return this.searchFilter(searchQuery, user, searchField);
      });
      if (userPair.length !== 0) {
        filteredUsers.push(response[i]);
      }
    }
    return filteredUsers;
  }

  searchFilter = (searchQuery, user, searchField) => {
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

  filterPositiveKeys = () => {
    let { filter } = this.state;
    let positiveFilters = {};
    let keys = Object.keys(filter);
    _.each(keys, function(key) {
      positiveFilters[key] = {};
    });
  
    for (var key in filter) {
      positiveFilters[key] = _.omitBy(filter[key], function(omitValue) {
        return omitValue === false;
      });
      if (positiveFilters[key]['humanResources']) {
        positiveFilters[key]['human resources'] = positiveFilters[key]['humanResources'];
      }
    }
    return positiveFilters;
  }

  allUsersFilter = (userListSingle) => {
    let filteredUsers = [];
    let positiveFilters = this.filterPositiveKeys();
    let userList = userListSingle;
    let match;

    userList.forEach(function(user) {
      match = true;
      for (var key in positiveFilters) {
        if (!_.includes(Object.keys(positiveFilters[key]), user[key])) {
          match = false;
        }
      }
      if (match) {
        filteredUsers.push(user);
      }
    });
    return filteredUsers;
  }

  pairUserFilter = (userListPair) => {
    let filteredUsers = [];
    let match;
    let positiveFilters = this.filterPositiveKeys();
    let userList = userListPair;
    userList.forEach(function(userPair) {
      match = true;
      userPair.forEach(function(user) {
        for (var key in positiveFilters) {
          if (!_.includes(Object.keys(positiveFilters[key]), user[key])) {
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

  optionsFilter = () => {
    const { filter } = this.state;
    let filterBy = [];

    for (let filterCategory in filter) {
      for (let filterOption in filter[filterCategory]) {
        if (filter[filterCategory][filterOption] === false) {
          if (filterOption === 'humanResources') {
            filterOption = 'human resources';
          }
          filterBy.push([filterCategory, filterOption]);
        }
      }
    }

    if (filterBy.length === 0) {
      return null;
    } else {
      return filterBy;
    }
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
      filteredUsers = this.filterSearchUser();
      filteredUsers = this.pairUserFilter(filteredUsers);
    } else {
      filteredUsers = this.filterSearchAllUsers();
      filteredUsers = this.allUsersFilter(filteredUsers);
    }

    return (!response.length ? 
      <h1 className='flex justify-center'>Loading</h1>
      :
      <div className='tc'>
        <Header weekDate={weekDate}></Header>
        <div className='contentContainer'>
          <Toolbar searchChange={this.onSearchChange} checkboxChange={this.onCheckboxChange} radioChange={this.onRadioChange} filter={filter}/>
          <Scroll>
            <CardList hbcUsers={filteredUsers} showFilter={showFilter}></CardList>
          </Scroll>
        </div>
      </div>
    )
  }
}

export default App;
