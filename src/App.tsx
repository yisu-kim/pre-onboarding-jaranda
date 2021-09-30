import { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { ROUTES } from 'utils/constants';
import userDataStorage from 'utils/storage/userData';
import { PrivateRoute, PublicRoute } from 'routes';
import Landing from 'Pages/Landing';
import Support from 'Pages/Support';
import Help from 'Pages/Help';
import Login from 'Pages/SignIn';
import SignUp from 'Pages/SignUp';
import Watch from 'Pages/Watch';
import Form from 'Pages/Form';
import History from 'Pages/History';
import Schedule from 'Pages/Schedule';
import Log from 'Pages/Log';
import Admin from 'Pages/Admin';
import NotFound from 'Pages/NotFound';

const App: React.FC = () => {
  useEffect(() => {
    if (!userDataStorage.isExist()) {
      userDataStorage.init();
    }
  }, []);

  return (
    <Switch>
      <PublicRoute exact path={ROUTES.MAIN} restricted={false}>
        <Landing />
      </PublicRoute>
      <PublicRoute path={ROUTES.SUPPORT} restricted={false}>
        <Support />
      </PublicRoute>
      <PublicRoute path={ROUTES.HELP} restricted={false}>
        <Help />
      </PublicRoute>
      <PublicRoute path={ROUTES.SIGN_IN} restricted={true}>
        <Login />
      </PublicRoute>
      <PublicRoute path={ROUTES.SIGN_UP} restricted={true}>
        <SignUp />
      </PublicRoute>
      <PrivateRoute path={ROUTES.WATCH}>
        <Watch />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.FORM}>
        <Form />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.HISTORY}>
        <History />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.SCHEDULE}>
        <Schedule />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.LOG}>
        <Log />
      </PrivateRoute>
      <PrivateRoute path={ROUTES.ADMIN}>
        <Admin />
      </PrivateRoute>
      <PublicRoute path={ROUTES.NOTFOUND} restricted={false}>
        <NotFound />
      </PublicRoute>
    </Switch>
  );
};

export default App;
