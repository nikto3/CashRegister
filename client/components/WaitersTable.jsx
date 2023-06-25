import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from '@mui/material';
import WaiterTableRow from './WaiterTableRow';

const WaitersTable = ({ waiters, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper} sx={{ maxHeight: '585px'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>Ime</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>Prezime</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>Korisnicko ime</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>Sifra</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>Radnja</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {waiters.map((waiter, index) => (
                        <WaiterTableRow
                            key={waiter.id}
                            waiter={waiter}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            isEvenRow={index % 2 === 0}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default WaitersTable;
