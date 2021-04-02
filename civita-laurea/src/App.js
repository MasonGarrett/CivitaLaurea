import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './SignIn';
import HomeScreen from './HomeScreen';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
// eslint-disable-next-line import/named
import Paperbase from './Dashboard/Paperbase';
import './App.css';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <SignIn />
        ) : (
          <Switch>
            <Route exact path="/">
              <Paperbase />
              {/* <HomeScreen /> */}
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
