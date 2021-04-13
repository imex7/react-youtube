import React from 'react'
import 'antd/dist/antd.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import SearchVideos from './components/searchVideos'
import Login from './components/login'
import ShowSaved from './components/showSaved'
import {store, persistor} from './store'

function App() {
  return <>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/search" component={SearchVideos} />
            <Route path="/saved" component={ShowSaved} />
            <Redirect from="/" to="/login" />
          </Switch>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </>
}

export default App;
