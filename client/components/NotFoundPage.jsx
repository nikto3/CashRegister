import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    typography: {
        fontFamily: 'Kalam, cursive'
    }});

export default function NotFoundPage() {
    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    textAlign: "center",
                    gap: "16px"
                }}
            >
                <Typography variant="h2" component="h1" gutterBottom>
                    Ups! Stranica nije pronađena
                </Typography>
                <Typography variant="h4" component="p" gutterBottom>
                    Stranica koju tražite ne postoji.
                </Typography>
                <Link
                    to="/"
                >
                    <Button variant="outlined" color="primary">
                        IDI NAZAD
                    </Button>
                </Link>
            </div>
        </ThemeProvider>
    );
}
