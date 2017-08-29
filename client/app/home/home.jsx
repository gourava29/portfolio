import React from 'react';
import Main from './components/Main/MainComponentContainer';
import { Provider } from 'react-redux';

import configureStore from './store';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   title: "Gourav Agarwal",
    //   role: 'Web Developer',
    //   connections: [
    //     {name: 'Quora', link: 'https://www.quora.com/profile/Gourav-Agarwal-6', iconClass: 'fa-quora'},
    //     {name: 'LinkedIn', link: 'https://www.linkedin.com/in/gourava29/', iconClass: 'fa-linkedin'}
    //   ]
    // };
  }

  render() {
    const store = configureStore({
      main: {...this.props, level: 0}
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