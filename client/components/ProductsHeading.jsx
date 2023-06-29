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
                        label="Naziv"
                        variant="outlined"
                        value={name}
                        size="small"
                        onChange={(e) => setName(e.target.value || '')}
                    />
                    <IconButton color="inherit" onClick={() => onSearch(name, category, type)}>
                        <Search />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                    <FormControl fullWidth sx={{ minWidth: '200px' }}>
                        <InputLabel>Pretraži po kategoriji</InputLabel>
                        <Select
                            label="Pretraži po kategoriji"
                            value={category}
                            onChange={(e) => setCategory(e.target.value || '')}
                        >
                            <MenuItem value=''>
                                <em>Prazno</em>
                            </MenuItem>
                            <MenuItem value='Pice'>
                                Pice
                            </MenuItem>
                            <MenuItem value='Hrana'>
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
                        <InputLabel>Pretraži po vrsti</InputLabel>
                        <Select
                            label="Pretraži po vrsti"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value || '');
                                console.log(e.target.value);
                            }}
                        >
                            <MenuItem value=''>
                                <em>Prazno</em>
                            </MenuItem>
                            <MenuItem value='Alkoholno pice'>
                                Alkoholno pice
                            </MenuItem>
                            <MenuItem value='Topli napitak'>
                                Topli napitak
                            </MenuItem>
                            <MenuItem value='Sok'>
                                Sok
                            </MenuItem>
                            <MenuItem value='Predjelo'>
                                Predjelo
                            </MenuItem>
                            <MenuItem value='Glavno jelo'>
                                Glavno jelo
                            </MenuItem>
                            <MenuItem value='Dezert'>
                                Dezert
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
