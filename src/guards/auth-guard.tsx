import { useEffect, useRef, useState, ReactNode } from 'react';
import { useAuthContext } from 'contexts/auth-context';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(() => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting');
      navigate({
        pathname: '/auth/login',
        search: pathname !== '/' ? `?continueUrl=${pathname}` : ''
      });
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, pathname, navigate]);

  if (!checked) {
    return null;
  }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return <>{children}</>;
};
