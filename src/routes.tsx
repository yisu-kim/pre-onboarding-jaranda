import { Redirect, Route } from 'react-router-dom';
import { ROUTES } from 'utils/constants';
import { checkIsAdmin, checkIsLoggedIn } from 'Services/auth';
import { isUserMenu } from 'Services/user';

interface PublicRouteProps {
  restricted: boolean;
  children: React.ReactNode;
  [x: string]: unknown;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  restricted,
  children,
  ...rest
}: PublicRouteProps) => {
  return (
    <Route {...rest}>
      {checkIsLoggedIn() && restricted ? (
        <>
          {checkIsAdmin() ? (
            <Redirect to={ROUTES.ADMIN} />
          ) : (
            <Redirect to={ROUTES.MAIN} />
          )}
        </>
      ) : (
        children
      )}
    </Route>
  );
};

interface PrivateRouteProps {
  path: string;
  children: React.ReactNode;
  [x: string]: unknown;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  children,
  ...rest
}: PrivateRouteProps) => {
  if (!checkIsLoggedIn()) {
    return <Redirect to={ROUTES.MAIN} />;
  }

  if (checkIsAdmin()) {
    return <Route {...rest}>{children}</Route>;
  }

  return (
    <Route {...rest}>
      {isUserMenu(path) ? children : <Redirect to={ROUTES.MAIN} />}
    </Route>
  );
};
