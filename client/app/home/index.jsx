import ReactOnRails from 'react-on-rails';

import Home from './home';
import 'font-awesome/scss/font-awesome.scss';

require('../styles/all.scss');


// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Home,
});


