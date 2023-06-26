import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const WaiterTableRow = ({ waiter, onEdit, onDelete, isEvenRow }) => {
    const handleEdit = () => {
        onEdit(waiter);
    };

    const handleDelete = () => {
        onDelete(waiter.id);
    };

    return (
        <TableRow sx={{ backgroundColor: isEvenRow ? '#f5f5f5' : 'inherit'}}>
            <TableCell>{waiter.Ime}</TableCell>
            <TableCell>{waiter.Prezime}</TableCell>
            <TableCell>{waiter.Username}</TableCell>
            <TableCell>{waiter.Password}</TableCell>
            <TableCell>{waiter.Naziv_Uloge}</TableCell>
            <TableCell>
                <IconButton color="default" onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default WaiterTableRow;

