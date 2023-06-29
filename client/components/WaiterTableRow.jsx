import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const WaiterTableRow = ({ waiter, onDelete, isEvenRow }) => {

    return (
        <TableRow sx={{ backgroundColor: isEvenRow ? '#f5f5f5' : 'inherit' }}>
            <TableCell>{waiter.Ime}</TableCell>
            <TableCell>{waiter.Prezime}</TableCell>
            <TableCell>{waiter.Username}</TableCell>
            <TableCell>{waiter.Naziv_Uloge }</TableCell>
            <TableCell>
                <IconButton
                    color="default"
                    onClick={() => onDelete(waiter.ID)}
                    disabled={waiter.Naziv_Uloge === 'Admin'}
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default WaiterTableRow;

