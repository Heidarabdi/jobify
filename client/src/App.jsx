// eslint-disable-next-line no-unused-vars
import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
    HomeLayout,
    DashboardLayout,
    Register,
    Login,
    Error,
    Landing,
    AddJob,
    Stats,
    AllJobs,
    Profile,
    Admin,
} from "./pages";

const checkDefaultTheme = () => {
    const isDarkTheme =
        localStorage.getItem('darkTheme') === 'true'
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'dashboard',
                element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
                children:[
                    {
                        index: true,
                        element: <AddJob />,
                    },
                    { path: 'stats', element: <Stats /> },
                    {
                        path: 'all-jobs',
                        element: <AllJobs />,
                    },

                    {
                        path: 'profile',
                        element: <Profile />,
                    },
                    {
                        path: 'admin',
                        element: <Admin />,
                    },
                ]
            },
        ],
    },
    ],
    );

function App() {
   return <RouterProvider router={router} />;
}

export default App;