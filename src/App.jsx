import JobsComponent from './components/JobsComponent';
import FilterBox from './components/FilterBox';
import { useState } from 'react';

const App = () => {
  const [filters, setFilters] = useState({
    roles: [],
    jobLocation: [],
    experience: [],
    remote: [],
    minimumSalary: [],
    searchQuery: ''
  });
  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value.toString().toLowerCase()
    }));
  };
  return (
    <>
      <FilterBox
        handleFilterChange={handleFilterChange}
      />
      <JobsComponent filters={filters} />
    </>
  );
};

export default App;
