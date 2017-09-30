
import Main from './MainComponent.jsx';
import { connect } from 'react-redux';
const mapStateToProps = (state) => ({ ...state.main });

export default connect(mapStateToProps, null)(Main);
