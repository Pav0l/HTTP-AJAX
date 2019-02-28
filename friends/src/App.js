import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Table from './components/Table';
import Form from './components/Form';

export default class App extends Component {
  state = {
    friends: null,
    editingFriend: false,
    loading: false,
    error: null,
    formObj: {
      id: '',
      name: '',
      age: '',
      email: '',
    },
  }

  componentDidMount() {
    this.fetchFriends();
  }

  loaderStart = () => this.setState({ loading: true });

  loaderFinish = () => this.setState({ loading: false });

  fetchFriends = () => {
    this.loaderStart();
    this.resetError();

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

  resetError = () => this.setState({ error: null });

  postFriend = () => {
    this.loaderStart();
    this.resetError();

    const { name, age, email } = this.state.formObj;
    const friend = {name: name, age: Number(age), email: email};
    
    axios.post('http://localhost:5000/friends', friend)
    .then(this.fetchFriends)
    .catch(this.setError);

    this.clearInputs()
  }

  deleteFriend = (id) => {
    this.loaderStart();
    this.resetError();
    axios.delete(`http://localhost:5000/friends/${id}`)
      .then(this.fetchFriends)
      .catch(this.setError);
  }

  putFriend = () => {
    this.loaderStart();
    this.resetError();

    const { name, age, email, id } = this.state.formObj;
    const friend = {name: name, age: Number(age), email: email};

    axios.put(`http://localhost:5000/friends/${id}`, friend)
      .then(this.fetchFriends)
      .catch(this.setError);

    this.changeEditingState(false);
    this.clearInputs();
  }

  changeEditingState = (bool) => {
    this.setState({
      editingFriend: bool,
    });
  }

  editFriend = (id) => {
    this.changeEditingState(true);

    const editedFriend = this.state.friends.filter(friend => friend.id === id);
    this.setState({
      formObj: {
        id: editedFriend[0].id,
        name: editedFriend[0].name,
        age: editedFriend[0].age,
        email: editedFriend[0].email,
      }
    });
  }

  formSubmit = event => {
    this.setState({
      formObj: {
        ...this.state.formObj,
        [event.target.name]: event.target.value,
      }
    });
  }

  clearInputs = () => {
    this.setState({
      formObj: {
        name: '',
        age: '',
        email: '',
      }
    })
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
          OH NO! We lost your friends <span role="img" aria-label="icon"> 😢</span>. {this.state.error.message}
        </StyledWrapper>
      );
    }

    return (
      <StyledWrapper>
        <TableHeader>My friends database:</TableHeader>
        
        <Table
          friends={this.state.friends}
          deleteFriend={this.deleteFriend}
          editFriend={this.editFriend}
        />

        <Form
          postFriend={this.postFriend}
          formObj={this.state.formObj}
          formSubmit={this.formSubmit}
          editingFriend={this.state.editingFriend}
          putFriend={this.putFriend}
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
