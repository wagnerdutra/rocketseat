import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  &.example-enter {
    opacity: 0.01;
  }

  &.example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  &.example-leave {
    opacity: 1;
  }

  &.example-leave.example-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;

export const Box = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 2px;
`;
