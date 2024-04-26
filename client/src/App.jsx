// eslint-disable-next-line no-unused-vars
import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
    Admin, EditJob, ErrorElement,
} from "./pages";

// actions
import {action as RegisterAction} from './pages/Register';
import {action as LoginAction} from './pages/Login';
import {action as AddJobAction} from './pages/AddJob';
import {action as EditJobAction} from './pages/EditJob';
import {action as DeleteJobAction} from './pages/DeleteJob'
import {action as ProfileAction} from './pages/Profile';

// loaders
import {loader as DashboardLoader} from './pages/DashboardLayout';
import {loader as AllJobsLoader} from './pages/AllJobs';
import {loader as EditJobLoader} from './pages/EditJob';
import {loader as AdminLoader} from './pages/Admin';
import {loader as StatsLoader} from './pages/Stats';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,// 5 minutes
        },
    },
});

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
                action: RegisterAction,
            },
            {
                path: 'login',
                element: <Login />,
                action: LoginAction,
            },
            {
                path: 'dashboard',
                element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
                loader: DashboardLoader,
                children:[
                    {
                        index: true,
                        element: <AddJob />,
                        action: AddJobAction,
                    },
                    {
                        path: 'stats',
                        element: <Stats />,
                        loader: StatsLoader,
                        errorElement: <ErrorElement />
                    },
                    {
                        path: 'all-jobs',
                        element: <AllJobs />,
                        loader: AllJobsLoader,
                    },

                    {
                        path: 'profile',
                        element: <Profile />,
                        action: ProfileAction,
                    },
                    {
                        path: 'admin',
                        element: <Admin />,
                        loader: AdminLoader,
                    },
                    {
                        path:'edit-job/:id',
                        element: <EditJob />,
                        loader: EditJobLoader,
                        action : EditJobAction,
                    },
                    {
                        path: 'delete-job/:id',
                        action: DeleteJobAction
                    }
                ]
            },
        ],
    },
    ],
    );

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;