import ReactOnRails from 'react-on-rails';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from './home';
import 'font-awesome/scss/font-awesome.scss';

require('../styles/style.scss');


// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Home,
});


