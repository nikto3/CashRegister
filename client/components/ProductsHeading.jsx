import React, { useState } from 'react';
import {Typography, IconButton, Box, TextField, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { Search, AddCircleOutline } from '@mui/icons-material';

const ProductsHeading = ({ onAddProduct, onSearch }) => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');

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
            {/* Naslov */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <Typography variant="h5">Proizvodi</Typography>
                <IconButton color="inherit" onClick={onAddProduct}>
                    <AddCircleOutline />
                </IconButton>
            </Box>

            {/* Search bars */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center',  padding: '5px' }}>
                    <TextField
                        label="Search by name"
                        variant="outlined"
                        value={name}
                        size="small"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <IconButton color="inherit" onClick={() => onSearch(name, category, type)}>
                        <Search />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                    <FormControl fullWidth sx={{ minWidth: '200px' }}>
                        <InputLabel>Search by Category</InputLabel>
                        <Select
                            label="Search by Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value || '')}
                        >
                            <MenuItem value=''>
                                <em>Prazno</em>
                            </MenuItem>
                            <MenuItem value='pice'>
                                Pice
                            </MenuItem>
                            <MenuItem value='hrana'>
                                Hrana
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton color="inherit" onClick={() => onSearch(name, category, type)}>
                        <Search />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                    <FormControl fullWidth sx={{ minWidth: '200px' }}>
                        <InputLabel>Search by Type</InputLabel>
                        <Select
                            label="Search by Type"
                            value={type}
                            onChange={(e) => setType(e.target.value || '')}
                        >
                            <MenuItem value=''>
                                <em>Prazno</em>
                            </MenuItem>
                            <MenuItem value='alkohol'>
                                Alkoholna pica
                            </MenuItem>
                            <MenuItem value='toplo'>
                                Topli napici
                            </MenuItem>
                            <MenuItem value='sok'>
                                Sokovi
                            </MenuItem>
                            <MenuItem value='predjelo'>
                                Predjela
                            </MenuItem>
                            <MenuItem value='glavno jelo'>
                                Glavna jela
                            </MenuItem>
                            <MenuItem value='dezert'>
                                Dezerti
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton color="inherit" onClick={() => onSearch(name, category, type)}>
                        <Search />
                    </IconButton>
                </Box>
            </Box>

        </Box>
    );
};

export default ProductsHeading;
