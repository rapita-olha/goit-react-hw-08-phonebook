import { useEffect, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { refreshUser } from './redux/auth/auth-operations';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

import { getIsFetchingCurrent } from './redux/auth/auth-selectors';

import PrivateRoute from './Routes/PrivateRoute';
import PublicRoute from './Routes/PublicRoute';

import './App.scss';

const HomeView = lazy(() =>
  import('./views/HomeView/HomeView'),
);
const RegisterView = lazy(() =>
  import(
    './views/RegisterView/RegisterView'
  ),
);
const LoginView = lazy(() =>
  import('./views/LoginView/LoginView'),
);
const ContactsView = lazy(() =>
  import(
    './views/ContactsView/ContactsView'
  ),
);

export default function App() {
  const isFetchingCurrentUser = useSelector(getIsFetchingCurrent);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    !isFetchingCurrentUser && (
      <>
        <Header />

        <main style={{ padding: '20px 10px 20px 10px' }}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>
            <PublicRoute exact path="/register" restricted>
              <RegisterView />
            </PublicRoute>
            <PublicRoute exact path="/login" restricted redirectTo="/contacts">
              <LoginView />
            </PublicRoute>
            <PrivateRoute exact path="/contacts" redirectTo="/login">
              <ContactsView />
            </PrivateRoute>
          </Suspense>
        </main>

        <Footer />
      </>
    )
  );
}