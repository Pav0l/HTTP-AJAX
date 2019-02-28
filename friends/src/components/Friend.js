import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Friend({ friend, deleteFriend, editFriend }) {
  return (
    <tr>
      <td>{friend.id}</td>
      <td>{friend.name}</td>
      <td>{friend.age}</td>
      <td>{friend.email}</td>
      <td><StyledBtn onClick={() => editFriend(friend.id)}>Edit</StyledBtn></td>
      <td><StyledBtn onClick={() => deleteFriend(friend.id)}>Delete</StyledBtn></td>
      <td><Link to={`/friend/${friend.id}`}><StyledBtn>Go to Friend</StyledBtn></Link></td>
    </tr>
  );
}

Friend.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  }),
  deleteFriend: PropTypes.func.isRequired,
  editFriend: PropTypes.func.isRequired,
}

const StyledBtn = styled.button`
  padding: 0.5rem;
  background-color: navy;
  border: 1px solid navy;
  color: white;
  border-radius: 4px;
  :hover {
    background-color: white;
    color: navy;
  }
`;
