import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userData from './userData/userDataReducer';
import appData from './appData/appDataReducer';
import locationData from './locationData/locationDataReducer';
import tableData from './tableData/tableDataReducer';
import auth from './authentication/authenticationReducer';

declare module 'redux' {
    export interface Dispatch<A extends Action = AnyAction> {
        <TReturnType, TState, TExtraThunkArg>(
            thunkAction: ThunkAction<TReturnType, TState, TExtraThunkArg, A>
        ): TReturnType;
    }
}

const reducer = combineReducers({
    userData,
    appData,
    locationData,
    tableData,
    auth,
});

export type RootState = ReturnType<typeof reducer>;

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
