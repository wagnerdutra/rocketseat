import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  p {
    text-align: center;
    font-weight: bold;
  }

  input {
    border: 1px solid #ccc;
    background-color: white;
    font-size: 10pt;
    padding: 8px;
    color: gray;
    margin-top: 10px;
  }

  button {
    &:hover {
      cursor: pointer;
    }

    &:last-child {
      margin-left: 10px;
    }
  }
`;

export default Form;
