import React from 'react';

import {createGlobalStyle} from 'styled-components';

import star from './star.svg';
import { Header } from "@book-desk/ui";
import { BaseCSS } from 'styled-bootstrap-grid';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    margin: 0;
  }
`

export const App = () => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.styled-components file.
   */
  return <React.Fragment>
    <GlobalStyle></GlobalStyle>
    <Header></Header>
  </React.Fragment>
}


export default App;
