import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Form({ formSubmit, postFriend, formObj, editingFriend, putFriend }) {

  const formSubmitHandler = event => {
    event.preventDefault();
    formSubmit(event);    
  }

  const onSubmitHandler = event => {
    event.preventDefault();    
    editingFriend ? putFriend() : postFriend();
  }
  
  return (
    <FriendForm onSubmit={onSubmitHandler}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder="Enter Friends Name"
        name="name"
        autoComplete="off"
        value={formObj.name}
        onChange={formSubmitHandler}
        required
      />

      <label htmlFor="age">Age</label>
      <input
        type="text"
        placeholder="Enter Friends Age"
        name="age"
        autoComplete="off"
        value={formObj.age}
        onChange={formSubmitHandler}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Enter Friends Email"
        name="email"
        autoComplete="off"
        value={formObj.email}
        onChange={formSubmitHandler}
        required
      />

      {
        editingFriend
        ?
        <button type="submit">Edit Friend</button>
        :
        <button type="submit">Add Friend</button>
      }
    </FriendForm>
  );
}

Form.defaultPropTypes = {
  formObj: PropTypes.shape({
    name: '',
    age: '',
    email: '',
  }),
}

Form.propTypes = {
  formObj: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
  }),
  formSubmit: PropTypes.func.isRequired,
  postFriend: PropTypes.func.isRequired,
  putFriend: PropTypes.func.isRequired,
}

const FriendForm = styled.form`
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 20%;

  label {
    font-weight: 600;
    margin-bottom: 0.2rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid navy;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  button {
    padding: 0.5rem;
    background-color: navy;
    border: 1px solid navy;
    color: white;
    border-radius: 4px;
    :hover {
      background-color: white;
      color: navy;
    }
  }
`;
