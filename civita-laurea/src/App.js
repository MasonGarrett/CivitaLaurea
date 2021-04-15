import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import routes from './routes';
import 'react-perfect-scrollbar/dist/css/styles.css';
import theme from './theme';
import GlobalStyles from './components/GlobalStyles';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import './App.css';

const App = () => {
  // ASK MASON: not sure if this was only for the route thingy or was this for something else
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const routing = useRoutes(routes());

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
        localStorage.setItem('user', true);
      } else {
        dispatch(logout());
        localStorage.removeItem('user');
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
