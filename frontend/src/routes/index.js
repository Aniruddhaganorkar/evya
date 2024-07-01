import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import App from '../App';
import ErrorPage from "../pages/ErrorPage"; // Assume you have an ErrorPage component

const Member = lazy(() => import("../pages/Member"));

const router = createBrowserRouter([
    {
       path: "/",
       element: <App/>, 
       errorElement: <ErrorPage />, // Add error boundary
       children: [
        {
            path: 'members/',
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Member />
                </Suspense>
            )
        }
       ]
    }
]);

export default router;
