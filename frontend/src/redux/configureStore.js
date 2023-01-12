import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import authReducer from './authReducer'
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';
import { setAuthorizationHeader } from '../api/apiCall';

const secureLS = new SecureLS();

const configureStore = () => {
    const initialState = getStateFromLocalStorage();
    setAuthorizationHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        authReducer,
        getStateFromLocalStorage(),
        composeEnhancers(applyMiddleware(thunk))

    );

    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    })
    return store;
}

export default configureStore;

const getStateFromLocalStorage = () => {
    const hoaxAuth = secureLS.get('hoax-auth');
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    };

    if (hoaxAuth) {
        return hoaxAuth;
    }
    return stateInLocalStorage;
}
const updateStateInStorage = (newState) => {
    secureLS.set('hoax-auth', newState);
}

