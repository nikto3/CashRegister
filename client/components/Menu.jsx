import React from "react";
import {Grid} from "@mui/material";
import MenuItem from "./MenuItem.jsx";

export default function Menu({ items, onSelectItemFunc }) {

    return (
        <Grid container spacing={3}>
            {items.map((item) => (
                <Grid item xs={6} sm={4} md={3} key={item.ID}>
                    <MenuItem
                        id={item.ID}
                        name={item.Naziv}
                        price={item.Cijena}
                        onSelectItem={onSelectItemFunc}
                        />
                </Grid>
            ))}
        </Grid>
    );
}
