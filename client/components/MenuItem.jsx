import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function MenuItem({ id, name, price, onSelectItem }) {

    return (
        <Card
            onClick={() => onSelectItem({id, name, price})}
            sx={{
                cursor: "pointer",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.8)"
            }}>
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
