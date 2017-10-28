export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("re-state");
        if(serializedState === null)
            return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        window.localStorage.setItem("re-state", JSON.stringify(state));
    } catch (err) {
        
    }   
}