import {Suspense} from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

const SuspenseLayout = () => (
  <Suspense fallback={<Spinner/>}>
    <Outlet />
  </Suspense>
);

export default SuspenseLayout;