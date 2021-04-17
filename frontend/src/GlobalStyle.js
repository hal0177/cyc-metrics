
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: rgb(14, 14, 14);
    font-size: 12px;
  }

  * {
    box-sizing: border-box;
    font-family: "Courier New", monospace;
  }
`;
 
export default GlobalStyle;
