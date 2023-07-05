import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';
import Cookies from "js-cookie";
import generateHistoryPdf from "../utils/generateHistoryPdf"
export default function ProductTableRow ({ product, handleEditProduct, handleDeleteProduct, isEvenRow }) {

    async function handleGetHistory(){
        try {
            const token = Cookies.get('token');
            const response = await fetch(`http://localhost:3000/backups/${product.ID}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok){
                const data = await response.json();
                generateHistoryPdf(data);
                console.log(data);
            }
        }
        catch (e) {
            
        }
    }
    
    
   return  (
   <TableRow key={product.ID} sx={{backgroundColor: isEvenRow ? '#f5f5f5' : 'inherit'}}>
        <TableCell>{product.Naziv}</TableCell>
        <TableCell>€{parseFloat(product.Cijena).toFixed(2)}</TableCell>
        <TableCell>{product.Naziv_Kat}</TableCell>
        <TableCell>{product.Naziv_Vrste}</TableCell>
        <TableCell>
            <IconButton onClick={() => handleEditProduct(product)}>
                <Edit/>
            </IconButton>
            <IconButton onClick={() => handleDeleteProduct(product.ID)}>
                <Delete/>
            </IconButton>
            <IconButton onClick={handleGetHistory}>
                <HistoryIcon/>
            </IconButton>
        </TableCell>
    </TableRow>
)

};

// export default ProductTableRow;
