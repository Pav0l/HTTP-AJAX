import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Form({ friends }) {
  return (

    <div>
      <FriendForm>
        <label for="name">Name</label>
        <input type="text" placeholder="Enter Friends Name" name="name" required />

        <label for="age">Age</label>
        <input type="text" placeholder="Enter Friends Age" name="age" required />

        <label for="email">Email</label>
        <input type="email" placeholder="Enter Friends Email" name="enail" required />

        <button type="submit">Add Friend</button>
      </FriendForm>

    </div>
  );
}

Form.propTypes = {
  friends: PropTypes.shape([{
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    }
  ]),
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
