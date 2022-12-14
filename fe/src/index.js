/*require('file-loader?name=[name].[ext]!./index.html');*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { BrowserRouter, Switch, Route ,Router } from 'react-router-dom';
import axios from 'axios';
import {CallbackComponent, loadUser, OidcProvider} from 'redux-oidc';
import {UserManager, WebStorageStateStore} from 'oidc-client';
import configureStore from './slices/store';

const createUserManager = (config) => {
    const userStore = new WebStorageStateStore({store: window.localStorage});
    const userManagerSettings = Object.assign({userStore: userStore}, config);
    const userManager =  new UserManager(userManagerSettings);
    userManager.events.addUserSignedOut(() => {
        userManager.removeUser();
    });
    return userManager;
};

if (module.hot) {
    module.hot.accept();
}

const renderApp = (store) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
            <Provider store={store}>
                <OidcProvider store={store} userManager={userManager}>
                        <Switch>
                            <Route exact path="/auth-callback" render={(props) => (
                                <CallbackComponent
                                    userManager={userManager}
                                    successCallback={() => props.history.replace('/')}
                                    errorCallback={() => props.history.replace('/')}>
                                    <div>Redirecting...</div>
                                </CallbackComponent>
                            )}/>
                            <Route path="/"><App/></Route>
                        </Switch>
                </OidcProvider>
            </Provider>
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    )
};

export let appConfig;
export let userManager;

const run = async () => {
    appConfig = (await axios.get('/config.json')).data;
    userManager = createUserManager(appConfig.oauth2);
    const store = configureStore({ userManager, initialState: { appConfig } });
    await loadUser(store, userManager);
    renderApp(store);
};
run().catch(e => console.error(e));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
/*reportWebVitals();*/
