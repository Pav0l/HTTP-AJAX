import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default function FriendListHeader() {
  return (    
    <Link to="/">
      <StyledTableHeader>My friends database:</StyledTableHeader>
    </Link>
  );
}

const StyledTableHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: navy;
  text-align: center;
`;
