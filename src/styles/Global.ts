import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: #1e272e;
    font-size: 16px;
    color: #f1f1f1;
  }

  body, input, button {
   font-family: Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer; 
    background: none;
    border: none;
  }
`;
