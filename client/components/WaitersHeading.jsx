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
                <Typography variant="h5">Korisnici</Typography>
                <IconButton color="inherit" onClick={onAddWaiter}>
                    <AddCircleOutline />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px', width: '60%' }}>
                <TextField
                    label="Pretraži po imenu"
                    variant="outlined"
                    size="small"
                    value={name}
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                />
                <IconButton color="inherit" onClick={() => onSearch(name, username)}>
                    <Search />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px', width: '60%' }}>
                <TextField
                    label="Pretraži po korisničkom imenu"
                    variant="outlined"
                    size="small"
                    fullWidth
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
