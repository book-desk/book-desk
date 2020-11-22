import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { Header } from '@book-desk/ui';
import { BaseCSS } from 'styled-bootstrap-grid';

import { ErrorBoundary } from './components';
import { Home, Signup } from './containers';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    margin: 0;
  }
`;

export const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
