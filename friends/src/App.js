import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Table from './components/Table';
import Form from './components/Form';

export default class App extends Component {
  state = {
    friends: null,
    loading: false,
    error: null,
  }

  componentDidMount() {
    this.fetchFriends();
  }

  loaderStart = () => this.setState({ loading: true });

  loaderFinish = () => this.setState({ loading: false });

  fetchFriends = () => {
    this.loaderStart();

    // Fetch data with JS fetch() method
    /*
    fetch('http://localhost:5000/friends')
      .then(data => data.json())
      .then(friends => {
        this.setState({ friends });
        this.loaderFinish();
      })
      .catch(this.setError);
    */

    // Fetch data with axios
    axios.get('http://localhost:5000/friends')
      .then(friends => {
        this.setState({ friends: friends.data });
        this.loaderFinish();
      })
      .catch(this.setError);
  }

  setError = (error) => {
    this.loaderFinish();
    this.setState({ error });
  }

  postFriend = (friend) => {
    axios.post('http://localhost:5000/friends', friend)
      .then(this.fetchFriends)
      .catch(err => console.log(err));
  }

  render() {

    if (this.state.loading) {
      return (
        <StyledWrapper>
          <span role="img" aria-label="icon">⏳ </span> Loading some friends for your lonely soul...
        </StyledWrapper>
      );
    }

    if (this.state.error) {
      return (
        <StyledWrapper>
          OH NO! We lost your friends <span role="img" aria-label="icon"> 😢</span>
        </StyledWrapper>
      );
    }

    return (
      <StyledWrapper>
        <TableHeader>My friends database:</TableHeader>
        
        <Table friends={this.state.friends} />

        <Form
          friends={this.state.friends}
          postFriend={this.postFriend}
        />

      </StyledWrapper>
    );
  }
}

const StyledWrapper = styled.div`
  margin: 1rem auto;
  text-align: center;
  font-size: 1rem;
`;

const TableHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: navy;
  text-align: center;
`;
