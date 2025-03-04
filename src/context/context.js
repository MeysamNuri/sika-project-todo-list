import React, { createContext, useContext, useReducer } from "react";

var CounterStateContext = createContext();
var CounterDispatchContext = createContext();

function counterReducer(state, action) {
    switch (action.type) {
        case "UPDATE_TEXT":
            return { ...state, updatedTaskList: action.payload};

        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function TestContextProvider({ children }) {
    var [state, dispatch] = useReducer(counterReducer, {
        updatedTaskList: [],
    });
    return (
        <CounterStateContext.Provider value={state}>
            <CounterDispatchContext.Provider value={dispatch}>
                {children}
            </CounterDispatchContext.Provider>
        </CounterStateContext.Provider>
    );
}

function useTestState() {
    var context = useContext(CounterStateContext);
    if (context === undefined) {
        throw new Error("useLayoutState must be used within a LayoutProvider");
    }
    return context;
}

function useTestDispatch() {
    var context = useContext(CounterDispatchContext);
    if (context === undefined) {
        throw new Error("useLayoutDispatch must be used within a LayoutProvider");
    }
    return context;
}

export {
    TestContextProvider,
    useTestState,
    useTestDispatch,
    updateText
};

// ###########################################################
function updateText(dispatch,payload) {
    dispatch({
        type: "UPDATE_TEXT",
        payload
    });
}

