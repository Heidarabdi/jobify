import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import customFetch from "../utils/customFetch.js";

const AllJobsContext = createContext();
export const loader = async ({ request }) => {
    try {
        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);

        const { data } = await customFetch.get('/jobs', {
            params,
        });

        return {
            data,
            searchValues: { ...params },
        };
    } catch (error) {
        toast.error(error.response.data.msg);
        return error;
    }
};

const AllJobs = () => {
    const { data, searchValues } = useLoaderData();

    return (
        // eslint-disable-next-line react/jsx-no-undef
        <AllJobsContext.Provider value={{ data, searchValues }}>
            <SearchContainer />
            <JobsContainer />
        </AllJobsContext.Provider>
    );
};

export const useAllJobsContext = () => useContext(AllJobsContext);
export default AllJobs;