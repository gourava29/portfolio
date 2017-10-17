import React from 'react';
import Main from './components/Main/MainComponentContainer';
import ModalSwitch from './components/ModalSwitch';
import { Provider } from 'react-redux';

import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';

import configureStore from './store';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const bHistory = createBrowserHistory();
    const store = configureStore({
      main: {...this.props, level: 0, childToMain: false}
    }, bHistory);
    return (
      <div className='wrapper'>
        <Provider store={store}>
          <Router history={bHistory}>
            <Route component={ModalSwitch} />
          </Router>
        </Provider>
      </div>
    );
  }
}