import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Login from './components/main/Login/Login';
import { IUser } from './core/interfaces/IUsers';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './components/store/store';
import { logInAction } from './components/store/user/user.slice';
import ProtectedRoute from './components/shared/ProtectedRoute/ProtectedRoute';
import Photos from './components/main/Photos/Photos';
import Posts from './components/main/Posts/Posts';
import Signup from './components/main/Signup/Signup';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const userLoggedIn = (token: string, user: IUser) => {
    localStorage.setItem('token', token);

    dispatch(logInAction({ logged: true, info: user }));

    return <Redirect to="/" />
  }

  return (
    <Router>
      <div className="main-container">
        <Switch>
          <Route path='/login'>
            <Login
              userLogguedIn={(token: string, user: IUser) => userLoggedIn(token, user)}
              userLogged={user.logged}
            />
          </Route>

          <Route path='/signup'>
            <Signup
              userLogged={user.logged}
            />
          </Route>

          <ProtectedRoute
            component={Photos}
            path='/photos'
          />

          <ProtectedRoute
            component={Posts}
            path='/'
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
