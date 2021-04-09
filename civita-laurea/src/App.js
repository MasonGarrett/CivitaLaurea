import React, { useEffect } from 'react';
import { useRoutes, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import routes from './routes';
import 'react-perfect-scrollbar/dist/css/styles.css';
import theme from './theme';
import GlobalStyles from './components/GlobalStyles';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import './App.css';
import SignIn from './pages/SignIn';

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const routing = useRoutes(routes(user));

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
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
