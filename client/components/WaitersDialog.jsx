import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, FormHelperText,
    InputLabel,
    OutlinedInput, TextField
} from "@mui/material";
import {Check, Close} from "@mui/icons-material";
import {useState} from "react";

export default function WaitersDialog({ setOpenDialog }) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    console.log('Rendered WaitersDialog component')

    const validateForm = () => {
        const newErrors = {};
        if (!name) {
            newErrors.name = "Ime je obavezno polje.";
        }
        if (!surname) {
            newErrors.surname = "Prezime je obavezno polje.";
        }
        if (!username) {
            newErrors.username = "Korisničko ime je obavezno polje.";
        }
        if (!password) {
            newErrors.password = "Šifra je obavezno polje.";
        }
        setErrors(newErrors);
        console.log(newErrors);
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
            <DialogTitle>Dodaj/Izmijeni konobara</DialogTitle>
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
                            id="ime"
                            label="Ime *"
                            defaultValue={name}
                            onChange={(event) => setName(event.target.value)}
                            error={!!errors.name}
                        />
                        {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
                    </FormControl>

                    <FormControl required fullWidth sx={{ m: "10px" }}>
                        <TextField
                            id="prezime"
                            label="Prezime *"
                            defaultValue={surname}
                            onChange={(event) => setSurname(event.target.value)}
                            error={!!errors.surname}
                        />
                        {errors.surname && <FormHelperText error>{errors.surname}</FormHelperText>}
                    </FormControl>

                    <FormControl required fullWidth sx={{ m: "10px" }}>
                        <TextField
                            id="username"
                            label="Korisničko ime *"
                            defaultValue={username}
                            onChange={(event) => setUsername(event.target.value)}
                            error={!!errors.username}
                        />
                        {errors.username && <FormHelperText error>{errors.username}</FormHelperText>}
                    </FormControl>

                    <FormControl required  fullWidth sx={{ m: "10px" }}>
                        <TextField
                            id="password"
                            label="Šifra *"
                            type="password"
                            defaultValue={password}
                            onChange={(event) => setPassword(event.target.value)}
                            error={!!errors.password}
                        />
                        {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="inherit" startIcon={<Close />} onClick={() => setOpenDialog(false)}>
                    Izadji
                </Button>
                <Button color="primary" startIcon={<Check />} onClick={handleSave}>
                    Sacuvaj
                </Button>
            </DialogActions>
        </>
    );
}