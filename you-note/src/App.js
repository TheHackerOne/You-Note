import React, { useState } from 'react';
import NoteApp from './note_app/NoteApp';
import Home from './HomePage/Home';
import './styles/App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './route_types/PrivateRoute'
import CustomAppBar from './appbar/AppBar';
import AuthForm from './auth/AuthForm';
import LandingPage from './landing/LandingPage';
import { AuthContext } from './auth/auth';

function App() {
  
  const existingToken = localStorage.getItem('token') || "";
  const existingUsername = localStorage.getItem('username') || "";
  const [authToken, setAuthToken] = useState(existingToken);
  const [username, setUsername] = useState(existingUsername);

  const setToken = (data) => {
    if(!data) {
      localStorage.removeItem('token');
      setAuthToken();
    } else {
      localStorage.setItem("token", JSON.stringify(data));
      setAuthToken(data);
    }
  }

  const setUserName = (data) => {
    if(!data) {
      localStorage.removeItem('username');
      setUsername();
    } else {
      localStorage.setItem("username", data);
      setUsername(data);
    }
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken, username, setUsername: setUserName }}>
      <div className='App' style={{backgroundColor: '#cad7e6'}}>
        <BrowserRouter>
          <CustomAppBar />
          <Switch>
            <Route exact path="/" component={ LandingPage }/>
            <Route exact path="/login" component={ AuthForm } />
            <Route exact path="/signup" component={ AuthForm } />
            <PrivateRoute exact path="/home" component={ Home } />
            <PrivateRoute exact path="/note" component={ NoteApp } />
            <PrivateRoute exact path="/new" component={ NoteApp } />
          </Switch>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
