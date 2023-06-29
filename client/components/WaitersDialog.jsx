import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, FormHelperText,
    InputLabel,
    OutlinedInput, TextField,
    Alert, AlertTitle
} from "@mui/material";
import {Check, Close} from "@mui/icons-material";
import {useEffect, useState} from "react";
import Cookies from "js-cookie"

export default function WaitersDialog({ setOpenDialog, setWaiters, setFilteredWaiters, setSuccessMessage }) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({tmp: ''});
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && formSubmitted) {
            console.log('Errors:', errors);
            setOpenDialog(false);
        }

    }, [errors]);

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

    const handleSave = async () => {
        if (validateForm()) {

            const cookie = Cookies.get('token');
            try {
                const res = await fetch('http://localhost:3000/waiters', {
                    method:'POST',
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        surname,
                        username,
                        password
                    })
                })

                if (res.status === 409){
                    setErrors(err => ({username: 'Korisnicko ime vec postoji'}));
                    setFormSubmitted(false);
                    console.log('Korisnik vec postoji');
                }

                else if (res.ok){
                    setSuccessMessage('Konobar uspješno sačuvan');
                    const newWaiter = await res.json();
                    setWaiters(prevWaiters => [...prevWaiters, newWaiter]);
                    setFilteredWaiters(prevWaiters => [...prevWaiters, newWaiter]);
                    setErrors({});
                    setFormSubmitted(true);
                }

            }
            catch (e) {
                console.log(e);

            }
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
                            name="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            error={!!errors.name}
                        />
                        {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
                    </FormControl>

                    <FormControl required fullWidth sx={{ m: "10px" }}>
                        <TextField
                            id="prezime"
                            label="Prezime *"
                            name="surname"
                            value={surname}
                            onChange={(event) => setSurname(event.target.value)}
                            error={!!errors.surname}
                        />
                        {errors.surname && <FormHelperText error>{errors.surname}</FormHelperText>}
                    </FormControl>

                    <FormControl required fullWidth sx={{ m: "10px" }}>
                        <TextField
                            id="username"
                            label="Korisničko ime *"
                            name='username'
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            error={!!errors.username}
                        />
                        {errors.username && <FormHelperText error>{errors.username}</FormHelperText>}
                    </FormControl>

                    <FormControl required  fullWidth sx={{ m: "10px" }}>
                        <TextField
                            id="password"
                            label="Šifra *"
                            name="password"
                            type="password"
                            value={password}
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