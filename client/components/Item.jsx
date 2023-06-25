import React from "react";
import { Typography, Box, IconButton, Tooltip, Button } from "@mui/material";
import { Delete, Print } from "@mui/icons-material";

export default function Item({ id, quantity, name, price, onDelete }) {
    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
                "&:hover .delete-icon": {
                    display: "block",
                },
            }}
        >
            <Typography>{`${quantity} x ${name}`}</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {price && <Typography>{`€${price.toFixed(2)}`}</Typography>}
                <Tooltip title="Delete" arrow>
                    <IconButton
                        className="delete-icon"
                        onClick={() => onDelete(id)}
                        sx={{ display: "none" }}
                    >
                        <Delete />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}
