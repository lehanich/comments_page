import { Suspense, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuthSelector, useAppDispatch } from "../../app/hooks";
// import {useAuthSelector} from "../../utils/authentication";
import {Layout} from "../components/Layout/Layout";
import Spinner from "../components/Spinner/Spinner";
import {useAuthValue} from '@src/AuthContext';

import {useNavigate, useLocation} from "react-router-dom";
// import {logOut, setToken} from "../../app/features/auth";
// import { refreshToken } from "../../app/features/auth/thunks/refreshToken";
import {wasAuthorised} from  "../../utils/authentication";

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
  // const { auth } = useSelector((x: any) => x.auth);
  // // const { store } = useSelector((x: any) => x);
  // const { data } = useAuthSelector();
  // const dispatch = useAppDispatch();


  // useEffect(() => {
  //   console.log("AUTH ", data)
  // }, [data]);

  useEffect(() => {
    console.log("!protected router")
    // if (!auth) {
    //   dispatch(setToken({access_token: ""}))
    //   // dispatch(refreshToken())
    // }

    // const timer = setInterval(() => {
    //   console.log('Layout interval');
      
    //   // if (!auth) {
    //   //   clearInterval(timer);
    //   // }
    //   // // dispatch(refreshToken()).then(() => {
    //   // //   console.log("auth 2", auth);
    //   // // });
    //   // console.log(auth)

    //   // // console.log("auth", auth);
    //   // // if (auth.access_token == '' && auth.refresh_token == '') {
    //   // //   console.log("No auth", auth);
    //   // //   // clearInterval(timer);
    //   // //   // dispatch(logOut());
    //   // //   // navigate("/login");
    //   // // } 

    // }, 270000);

    return () => {
      // clearInterval(timer);
    };
  }, []);

  return <Layout >
    <Suspense fallback={<Spinner auth/>}>
      {!currentUser?.emailVerified && <Navigate to={redirectPath} replace />}
      {children ? children : <Outlet />}

      
      {/* {!isLogined 
        ? <Navigate to={redirectPath} replace />
        : children ? children : <Outlet />} */}
    </Suspense>
  </Layout>
};

export default ProtectedLayout;
