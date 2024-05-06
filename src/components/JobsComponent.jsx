import { useState, useEffect } from 'react';
import JobCard from './JobCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './JobsComponent.css';
import Typography from '@mui/material/Typography';
/* This code snippet defines a React functional component called `JobsComponent` that takes in a
`filters` object as a prop. */
export default function JobsComponent({ filters }) {
    const { roles, jobLocation, experience, remote, minimumSalary, searchQuery } = filters;
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    /**
     * The function `fetchData` fetches job data, updates state variables, and handles loading and error
     * states.
     */
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetchJobs();
            setJobs(prevJobs => [...prevJobs, ...response.jdList]);
            setTotalCount(response.totalCount);
            setPage(prevPage => prevPage + 1); // Increment page only if fetch is successful
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
        setLoading(false);
    };

    /* The `useEffect(() => { fetchData(); }, []);` hook in the `JobsComponent` functional component is
    responsible for triggering the `fetchData` function when the component mounts for the first time. */
    useEffect(() => {
        fetchData();
    }, []);

    /**
     * This function triggers a fetchData() call when the user scrolls to within 100 pixels of the bottom
     * of the page.
     */
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 100
            ) {
                fetchData();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page]);


    /**
     * The function fetchJobs sends a POST request to a specific API endpoint to retrieve job data based
     * on specified parameters.
     * @returns The `fetchJobs` function is returning the result of the API call if the response is
     * successful (status code 200). If the response is not successful, it throws an error with the
     * message 'Failed to fetch jobs'.
     */
    const fetchJobs = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
            "limit": 10,
            "offset": (page - 1) * 10
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body
        };

        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            return (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h5" color={'black'}>Something Went Wrong</Typography>
            </Box>);
        }
    };

    /* The `useEffect` hook you provided is responsible for filtering the `jobs` based on the `filters`
    object passed as a prop to the `JobsComponent` functional component. Here's a breakdown of what
    the `useEffect` is doing: */
    useEffect(() => {
        let filteredJobs = [...jobs];

        if (remote && remote.length > 0) { // Ensure remote is an array before filtering
            if (remote.includes('remote')) {
                filteredJobs = filteredJobs.filter((job) => job.location === 'remote');
            }

            if (remote.includes('hybrid')) {
                filteredJobs = filteredJobs.filter((job) => job.location === 'hybrid');
            }

            if (remote.includes('in-office')) {
                filteredJobs = filteredJobs.filter((job) => job.location !== 'remote' && job.location !== 'hybrid');
            }
        }

        if (searchQuery) {
            filteredJobs = filteredJobs.filter(job => job.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if (experience.length > 0) {
            filteredJobs = filteredJobs.filter(job => experience.includes(job.minExp));
        }

        if (roles.length > 0) {
            filteredJobs = filteredJobs.filter(job => roles.includes(job.jobRole.toLowerCase()));
        }

        if (minimumSalary.length > 0) {
            filteredJobs = filteredJobs.filter(job => minimumSalary.includes(job.minJdSalary))
        }
        if (jobLocation.length > 0) {
            filteredJobs = filteredJobs.filter(job => jobLocation.includes(job.location))
        }

        setFilteredJobs(filteredJobs);
    }, [filters]);

    /* This `return` block in the `JobsComponent` functional component is responsible for rendering the
    JSX elements based on certain conditions: */
    return (
        <>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            )}

            {filteredJobs.length > 0 ? (
                <div className="app-container">
                    {filteredJobs.map((job, index) => (
                        <JobCard key={index} jobData={job} />
                    ))}
                </div>
            ) : jobs.length > 0 ? (
                <div className="app-container">
                    {jobs.map((job, index) => (
                        <JobCard key={index} jobData={job} />
                    ))}
                </div>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Typography variant="h5" color={'black'}>No matches found</Typography>
                </Box>
            )}
        </>
    );
}
