
import React, {Suspense, lazy} from "react";
import { BrowserRouter, Router, Routes, NavLink, Navigate, useLocation, Outlet } from "react-router-dom";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";
import SuspenseLayout from "./SuspenseLayout";
import  Spinner from "../components/Spinner/Spinner";

const Login = lazy(() => import('../../pages/Login/Login'));
const Register = lazy(() => import(/* webpackPrefetch: true */ '../../pages/Register/Register'));
const Comments = lazy(() => import(/* webpackPrefetch: true */ '../../pages/Comments/Comments'));

{/* <BrowserRouter > <Routes > */}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SuspenseLayout/>}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedLayout isLogined={false} />}>
        <Route index element={<Navigate to="comments" />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="logout" element={<Login logout/>} />
        {/* <Route path="comments" element={<Comments />} /> */}
        
      <Route path="/test" element={<Spinner />} />
        <Route
          path="*"
          element={<Navigate to="comments" replace={true} />}
        />        
      </Route>
    </Route>
  )
);

export default router;

