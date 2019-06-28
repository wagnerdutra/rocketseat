import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  * {
    padding: 0;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    color: #424242
  }

  button {
    width: 90px;
    height: 30px;
    border: none;
    border-radius: 2px;
    color: white;
    font-weight: bold;
    outline: none;
    &.secundary {
      background-color: gray;
    }

    &.success {
      background-color: #4caf50;
    }
  }

`;

export default GlobalStyle;
