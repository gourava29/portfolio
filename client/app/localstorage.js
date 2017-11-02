const persistedStateExpiry = 5*60*1000; //5min expirty
export const loadState = () => {
    try {
        const serializedState = window.localStorage.getItem("re-state");
        const lastTimeSet = parseInt(window.localStorage.getItem("re-state-timestamp"));
        if((new Date().getTime() - lastTimeSet > persistedStateExpiry) || serializedState === null)
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
        window.localStorage.setItem("re-state-timestamp", new Date().getTime());
    } catch (err) {
        
    }   
}