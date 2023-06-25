import {
    Box, Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useState} from "react";
import {Check, Close} from "@mui/icons-material";
import {NumericFormat} from "react-number-format";


export default function ProductsDialog({ setOpenDialog }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(null);
    const [errors, setErrors] = useState({});

    const handlePriceChange = (event) => {
        const input = event.target.value;
        // Remove any non-digit characters from the input
        const cleanedInput = input.replace(/[^0-9.]/g, "");
        // Restrict the input to one dot
        const dotCount = cleanedInput.split(".").length - 1;
        if (dotCount <= 1) {
            setPrice(cleanedInput);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (name.trim() === "") {
            newErrors.name = "Naziv je obavezno polje.";
        }
        if (category.trim() === "") {
            newErrors.category = "Kategorija je obavezno polje.";
        }
        if (type.trim() === "") {
            newErrors.type = "Tip je obavezno polje.";
        }
        if (!price) {
            newErrors.price = "Cijena je obavezno polje.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            // Perform save operation
            setOpenDialog(false);
        }
    };

    return (
        <>
            <DialogTitle>Dodaj/Izmijeni proizvod</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <FormControl required fullWidth sx={{ m: "10px" }}>
                        <TextField
                            label="Naziv *"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </FormControl>

                    <FormControl required fullWidth sx={{ m: "10px" }}>
                        <InputLabel htmlFor="Kategorija" id="Kategorija">
                            Kategorija
                        </InputLabel>
                        <Select
                            label="Kategorija"
                            value={category}
                            onChange={(event) => setCategory(event.target.value || "")}
                            error={!!errors.category}
                        >
                            <MenuItem value="hrana">Hrana</MenuItem>
                            <MenuItem value="pice">Pice</MenuItem>
                        </Select>
                        {errors.category && (
                            <Box sx={{ color: "red", fontSize: "12px" }}>
                                {errors.category}
                            </Box>
                        )}
                    </FormControl>

                    {category === "pice" ? (
                        <FormControl required fullWidth sx={{ m: "10px" }}>
                            <InputLabel id="tip">Tip</InputLabel>
                            <Select
                                label="Tip"
                                value={type}
                                onChange={(event) => setType(event.target.value || "")}
                                error={!!errors.type}
                                helperText={errors.type}
                            >
                                <MenuItem value="alkoholno pice">Alkoholno pice</MenuItem>
                                <MenuItem value="topli napitak">Topli napitak</MenuItem>
                                <MenuItem value="sok">Sok</MenuItem>
                            </Select>
                            {errors.type && (
                                <Box sx={{ color: "red", fontSize: "12px" }}>
                                    {errors.type}
                                </Box>
                            )}
                        </FormControl>
                    ) : (
                        <FormControl required fullWidth sx={{ m: "10px" }}>
                            <InputLabel id="tip">Tip</InputLabel>
                            <Select
                                label="Tip"
                                value={type}
                                onChange={(event) => setType(event.target.value || "")}
                                error={!!errors.type}
                            >
                                <MenuItem value="predjelo">Predjelo</MenuItem>
                                <MenuItem value="glavno jelo">Glavno jelo</MenuItem>
                                <MenuItem value="dezert">Dezert</MenuItem>
                            </Select>
                            {errors.type && (
                                <Box sx={{ color: "red", fontSize: "12px" }}>
                                    {errors.type}
                                </Box>
                            )}
                        </FormControl>
                    )}

                    <FormControl required fullWidth sx={{ m: "10px" }}>
                        <NumericFormat
                            label="Cijena *"
                            value={price}
                            onValueChange={({ value }) => setPrice(value)}
                            thousandSeparator
                            prefix="€"
                            allowNegative={false}
                            decimalScale={2}
                            customInput={TextField}

                        />
                    </FormControl>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    color="inherit"
                    startIcon={<Close />}
                    onClick={() => setOpenDialog(false)}
                >
                    Izadji
                </Button>
                <Button
                    color="primary"
                    startIcon={<Check />}
                    onClick={handleSave}
                >
                    Sacuvaj
                </Button>
            </DialogActions>
        </>
    );
}
