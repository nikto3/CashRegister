import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ProductTableRow = ({ product, handleEditProduct, handleDeleteProduct, isEvenRow }) => (
    <TableRow key={product.ID} sx={{ backgroundColor: isEvenRow ? '#f5f5f5' : 'inherit'}}>
        <TableCell>{product.Naziv}</TableCell>
        <TableCell>{product.Cijena}</TableCell>
        <TableCell>{product.Naziv_Kat}</TableCell>
        <TableCell>{product.Naziv_Vrste}</TableCell>
        <TableCell>
            <IconButton onClick={() => handleEditProduct(product)}>
                <Edit />
            </IconButton>
            <IconButton onClick={() => handleDeleteProduct(product)}>
                <Delete />
            </IconButton>
        </TableCell>
    </TableRow>
);

export default ProductTableRow;
