
import NodeComponent from './NodeComponent';
import { connect } from 'react-redux';
import { MAIN_NODE_TOGGLE, CHILD_NODE_TOGGLE } from '../../actions/NodeComponentActions'

const mapStateToProps = (state) => ({...state.nodeComp});

const mapDispatchToProps = (dispatch) => ({
	onChildNodeClicked: (name) => {
		dispatch(CHILD_NODE_TOGGLE(name));
	},
	onMainNodeClicked: () => {
		dispatch(MAIN_NODE_TOGGLE());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeComponent);