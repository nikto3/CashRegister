import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import ProductTableRow from "./ProductTableRow.jsx";
import React from "react";

export default function ProductsTable({ products, handleEditProduct, handleDeleteProduct }){
    return (
        <TableContainer component={Paper} sx={{ maxHeight: '620px'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>Naziv</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>Cijena</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h7" sx={{ fontWeight: 'bold' }}>Radnja</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product, index) => (
                        <ProductTableRow
                            key={product.id}
                            product={product}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteProduct}
                            isEvenRow={index % 2 === 0}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}