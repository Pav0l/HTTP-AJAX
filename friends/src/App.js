import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
        {
          this.state.friends && this.state.friends.map(friend => (
            <div key={friend.id}>
              <span>{friend.id} - </span>
              <span>{friend.name} - </span>
              <span>{friend.age} - </span>
              <span>{friend.email}</span>
            </div>
          ))
        }
      </StyledWrapper>
    );
  }
}

const StyledWrapper = styled.div`
  font-size: 1rem;
  div {
    font-size: 1rem;
  }
`;
