import React from 'react';
import Main from './components/Main/MainComponent';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Gourav Agarwal",
      role: 'Web Developer',
      connections: [
        {name: 'Quora', link: 'https://www.quora.com/profile/Gourav-Agarwal-6', iconClass: 'fa-quora'},
        {name: 'LinkedIn', link: 'https://www.linkedin.com/in/gourava29/', iconClass: 'fa-linkedin'}
      ]
    };
  }

  componentDidMount = () => {};

  render() {
    return (
      <div className='wrapper'>
          <Main {...this.state}/>
      </div>
    );
  }
}