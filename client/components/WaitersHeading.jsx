import React, {useState} from 'react';
import { Typography, IconButton, Box, TextField } from '@mui/material';
import { Search, AddCircleOutline } from '@mui/icons-material';

const WaitersHeading = ({ onAddWaiter, onSearch }) => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');


    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
                borderBottom: '1px solid black',
                padding: '10px',
                flexDirection: 'column'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <Typography variant="h5">Konobari</Typography>
                <IconButton color="inherit" onClick={onAddWaiter}>
                    <AddCircleOutline />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <TextField
                    label="Search by name"
                    variant="outlined"
                    size="small"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <IconButton color="inherit" onClick={() => onSearch(name, username)}>
                    <Search />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <TextField
                    label="Search by username"
                    variant="outlined"
                    size="small"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <IconButton color="inherit" onClick={() => onSearch(name, username)}>
                    <Search />
                </IconButton>
            </Box>
        </Box>
    );
};

export default WaitersHeading;
