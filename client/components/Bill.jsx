import React from "react";
import { Typography, Box, Paper, Button } from "@mui/material";
import Item from "./Item.jsx";
import { Print } from "@mui/icons-material";

export default function Bill({ items, onDeleteItem }) {

    const calculateTotal = () => {
        let sum = 0;
        items.forEach((item) => {
            sum += item.quantity * item.price;
        });
        return sum.toFixed(2);
    };

    const handlePrintBill = () => {
        // Implement your logic for printing the bill
        console.log("Printing the bill...");
    };

    return (
        <Box
            className="bill-container"
            sx={{
                backgroundColor: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                p: 3,
                border: "2px solid",
                borderColor: "primary.main",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
                Račun
            </Typography>

            {items && (
            <div>
                <Box
                    sx={{
                        flex: "1 1 auto",
                        overflowY: "auto",
                        marginBottom: "8px",
                        maxHeight: "calc(100% - 84px)", // Adjust the value as needed to fit the layout
                        borderBottom: "1px solid black"
                    }}
                >
                    {items.map((item) => (
                        <Item
                            key={item.id}
                            id={item.id}
                            quantity={item.quantity}
                            name={item.name}
                            price={item.price}
                            onDelete={onDeleteItem}
                        />
                    ))}
                </Box>

                <Box
                sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>Ukupno:</Typography>
            <Typography sx={{ fontWeight: "bold" }}>{`€${calculateTotal()}`}</Typography>
            </Box>
            </div>
            )}



            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Print />}
                    onClick={handlePrintBill}
                    sx={{ "&:hover": { backgroundColor: "#1e88e5" } }}
                >
                    Štampaj
                </Button>
            </Box>
        </Box>
    );
}
