import React, { useState, useEffect } from "react";
import {CircularProgress, Box, Typography, Grid} from "@mui/material";
import MenuItem from "../MenuItem.jsx";

export default function JuicesSection({ items }) {
    const [isLoading, setIsLoading] = useState(true);
    const [drinks, setDrinks] = useState([]);

    return (
        <Grid container spacing={3}>
            {items.map((item) => (
                <Grid item xs={6} sm={4} md={3} key={item.ID}>
                    <MenuItem id={item.ID} name={item.Naziv} price={item.Cijena} />
                </Grid>
            ))}
        </Grid>
    );
}
