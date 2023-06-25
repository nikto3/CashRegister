import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function MenuItem({ id, name, price, onSelectItem }) {
    const handleClick = () => {
        // Handle click event for the MenuItem
        console.log("MenuItem clicked:", name);
    };

    return (
        <Card onClick={() => onSelectItem({id, name, price})} sx={{ cursor: "pointer", height: "100%" }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ overflowWrap: "break-word" }}>
                    {name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ overflowWrap: "break-word" }}>
                    Cijena: {price}€
                </Typography>
            </CardContent>
        </Card>
    );
}
