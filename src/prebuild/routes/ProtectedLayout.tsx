import { Suspense, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import {Layout} from "../components/Layout/Layout";
import Spinner from "../components/Spinner/Spinner";
import {useAuthValue} from '@src/AuthContext';

interface ProtectedRouteProps {
  isLogined: boolean;
  redirectPath?: string;
  children?: any;
}
const ProtectedLayout: React.FC<ProtectedRouteProps> = ({
  isLogined,
  redirectPath = '/login',
  children,
}) => {
  const {currentUser} = useAuthValue()

  useEffect(() => {
    console.log("!protected router", currentUser?.emailVerified, redirectPath )

    return () => {
      // clearInterval(timer);
    };
  }, []);

  return <Layout >
    <Suspense fallback={<Spinner auth/>}>     
      {!Boolean(currentUser?.emailVerified) 
        ? <Navigate to={redirectPath} replace />
        : children ? children : <Outlet />}
    </Suspense>
  </Layout>
};

export default ProtectedLayout;
