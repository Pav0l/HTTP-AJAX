import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Table({ friends }) {
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
}

const StyledTable = styled.table`
  margin: 1rem auto;
`;
