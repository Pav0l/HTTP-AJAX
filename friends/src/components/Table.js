import React from 'react';
import { Route } from 'react-router-dom';
import TableHead from './TableHead';
import Friend from './Friend';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Table({ friends, deleteFriend, editFriend, }) {

  function ClickedFriend(props) {
    const friend = friends.find(
      fr => {
        return fr.id.toString() === props.match.params.id
      }
    );
    return <Friend friend={friend} />
  }

  function MappedFriends() {
    return (friends && friends.map(friend => (
      <Friend
        key={friend.id}
        friend={friend}
        editFriend={editFriend}
        deleteFriend={deleteFriend}
      />
    )));
  }

  return (
    <StyledTable>
      <Route path="/" component={TableHead} />

      <tbody>
        <Route
          path="/"
          exact
          render={MappedFriends}
        />
      </tbody>

      <tbody>
        <Route
          path="/friend/:id"
          render={ClickedFriend}
        />
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
