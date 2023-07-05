import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

export default function MenuItem({ id, name, price, picture, onSelectItem }) {
    return (
        <Card
            onClick={() => onSelectItem({ id, name, price })}
            sx={{
                cursor: "pointer",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ overflowWrap: "break-word" }}>
                    {name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ overflowWrap: "break-word" }}>
                    Cijena: {price}€
                </Typography>
            </CardContent>
            {picture && (
                <CardMedia
                    component="img"
                    src={`http://localhost:3000/uploads/${picture}`}
                    alt="Product"
                    style={{
                        height: '100%',
                        width: '50%'
                    }}

                />
            )}
        </Card>
    );
}
