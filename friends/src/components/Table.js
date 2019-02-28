import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Table({ friends, deleteFriend, editFriend }) {

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {
          friends && friends.map(friend => (
            <tr key={friend.id}>
              <td>{friend.id}</td>
              <td>{friend.name}</td>
              <td>{friend.age}</td>
              <td>{friend.email}</td>
              <td><StyledBtn onClick={() => editFriend(friend.id)}>Edit</StyledBtn></td>
              <td><StyledBtn onClick={() => deleteFriend(friend.id)}>Delete</StyledBtn></td>
            </tr>
          ))
        }
      </tbody>
    </StyledTable>
  );
}

Table.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
  })),
  deleteFriend: PropTypes.func.isRequired,
  editFriend: PropTypes.func.isRequired,
}

const StyledTable = styled.table`
  margin: 1rem auto;
  border-collapse: collapse;
  tbody {
    tr {
      border-bottom: 1px solid navy;
    }
  }
`;

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