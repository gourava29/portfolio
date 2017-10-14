import React from 'react';
import Main from './components/Main/MainComponentContainer';
import { Provider } from 'react-redux';

import configureStore from './store';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const store = configureStore({
      main: {...this.props, level: 0, childToMain: false}
    });

    return (
      <div className='wrapper'>
        <Provider store={store}>
          <Main/>
        </Provider>
      </div>
    );
  }
}