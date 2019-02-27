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
    fetch('http://localhost:5000/friends')
      .then(data => data.json())
      .then(friends => {
        this.setState({ friends });
        this.loaderFinish();
      })
      .catch(this.setError);
  }

  setError = (error) => {
    this.setState({ error });
  }

  render() {

    if (this.state.loading) {
      return (
        <StyledWrapper>
          Loading some friends for your lonely soul...
        </StyledWrapper>
      );
    }

    return (
      <StyledWrapper>
        {
          this.state.friends && this.state.friends.map(friend => (
            <div>
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
  font-size: 2rem;

  div {
    span {
      color: red;
      font-size: 2rem;
    }
  }
`;
