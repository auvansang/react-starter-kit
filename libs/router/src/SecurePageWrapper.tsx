import { Navigate, useLocation } from 'react-router';

type Props = {
  unAuthorizedPath: string;
  isAuthenticated: () => boolean;
  children: React.ReactNode;
};

const SecurePageWrapper = (props: Props) => {
  const location = useLocation();

  if (!props.isAuthenticated()) {
    return <Navigate to={props.unAuthorizedPath} state={{ from: location }} replace />;
  }

  return <>{props.children}</>;
};

export default SecurePageWrapper;
