
import NodeComponent from './NodeComponent';
import { connect } from 'react-redux';
import { MAIN_NODE_TOGGLE, CHILD_NODE_TOGGLE } from '../../actions/NodeComponentActions'

const mapStateToProps = (state) => ({...state.nodeComp});

const mapDispatchToProps = (dispatch) => ({
	onChildNodeClicked: (level, name, childNodeId, currentRoute, childLink, hasChildren) => {
		dispatch(CHILD_NODE_TOGGLE(level, name, childNodeId, currentRoute, childLink, hasChildren));
	},
	onMainNodeClicked: (level, name, isDirect) => {
		dispatch(MAIN_NODE_TOGGLE(level, name, isDirect));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeComponent);