export const CHILD_TO_MAIN_NODE_TRANSITION = (name, hasChildren) => {
	return {type: 'CHILD_TO_MAIN_NODE_TRANSITION', name, hasChildren: !!hasChildren};
}

export const MAIN_TO_CHILD_NODE_TRANSITION = name => {
	return {type: 'MAIN_TO_CHILD_NODE_TRANSITION', name};
}