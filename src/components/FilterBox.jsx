import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import { experience, jobLocation, minimumSalary, remote, roles } from '../constants'

const FilterBox = ({ handleFilterChange }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '95vw', padding: '10px', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
            <Autocomplete
                multiple
                limitTags={2}
                options={roles.map(role => role.charAt(0).toUpperCase() + role.slice(1).toLowerCase())}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Role" fullWidth />
                )}
                onChange={(event, value) => handleFilterChange('roles', value)}
                popupIcon={<KeyboardArrowDownOutlinedIcon />}
                sx={{ minWidth: 150, margin: '0 10px 10px 10px' }}
                key='roles'
            />

            <Autocomplete
                multiple
                limitTags={2}
                options={jobLocation.map(loation => loation.charAt(0).toUpperCase() + loation.slice(1).toLowerCase())}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Location" fullWidth />
                )}
                onChange={(event, value) => handleFilterChange('jobLocation', value)}
                popupIcon={<KeyboardArrowDownOutlinedIcon />}
                sx={{ minWidth: 250, margin: '0 10px 10px 10px' }}
                key='jobLocation'
            />

            <Autocomplete
                multiple
                limitTags={2}
                options={experience}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Experience" fullWidth />
                )}
                onChange={(event, value) => handleFilterChange('experience', value)}
                popupIcon={<KeyboardArrowDownOutlinedIcon />}
                sx={{ minWidth: 200, margin: '0 10px 10px 10px' }}
                key='experience'
            />

            <Autocomplete
                multiple
                limitTags={2}
                options={remote}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Remote" fullWidth />
                )}
                onChange={(event, value) => handleFilterChange('remote', value)}
                popupIcon={<KeyboardArrowDownOutlinedIcon />}
                sx={{ minWidth: 150, margin: '0 10px 10px 10px' }}
                key='remote'
            />

            <Autocomplete
                multiple
                limitTags={2}
                options={minimumSalary.map(salary => salary + 'L')}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                    <TextField {...params} placeholder="Minimum Base Pay Salary" fullWidth />
                )}
                onChange={(event, value) => handleFilterChange('minimumSalary', value)}
                popupIcon={<KeyboardArrowDownOutlinedIcon />}
                sx={{ minWidth: 150, margin: '0 10px 10px 10px' }}
                key='minimumSalary'
            />

            <TextField
                id="search"
                label="Search Company Name"
                style={{ margin: '0 10px 10px 10px', width: '20%' }}
                onChange={(event) => handleFilterChange('searchQuery', event.target.value)}
            />
        </div>
    );
};

export default FilterBox;
