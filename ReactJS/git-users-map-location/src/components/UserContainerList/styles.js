import styled from 'styled-components';

export const Box = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

export const User = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }

  img {
    border-radius: 100px;
    width: 48px;
    height: 48px;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .user-details {
    flex-grow: 2;
    margin-left: 5px;

    p:first-child {
      font-weight: bold;
    }
  }

  button {
    width: 50px;
    height: 50px;
    background-color: red;
  }
`;
