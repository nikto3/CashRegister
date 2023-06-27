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
import Cookies from 'js-cookie';


export default function ProductsDialog({ setOpenDialog, setProducts, setFilteredProducts, pName, pCategory, pType, pPrice }) {
    const [name, setName] = useState(pName);
    const [category, setCategory] = useState(pCategory);
    const [type, setType] = useState(pType);
    const [price, setPrice] = useState(pPrice);
    const [errors, setErrors] = useState({});


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

    const handleSave = async () => {
        if (validateForm()) {
            // Perform save operation
            // TODO dodati fetch post zahtjev ka bazi

            //console.log(name, category, type, price);
            const cookie = Cookies.get('token');

            try{
                const res = await fetch(`http://localhost:3000/${category}/${type}`,{
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {name,
                            price

                        })
                })

                if (res.ok){
                    console.log('Proizvod uspjesno sacuvano');
                    const newProduct = await res.json();
                    console.log('Proizvod', newProduct);
                    newProduct.Naziv_Kat = addCategory(newProduct.Naziv_Vrste);
                    setProducts(prevProducts => [...prevProducts, newProduct]);
                    setFilteredProducts(prevProducts => [...prevProducts, newProduct]);

                }
            }
            catch(err){

            }
            finally {
                setOpenDialog(false);
            }


        }
    };

    function addCategory(Naziv_Vrste){
        if (Naziv_Vrste === 'Alkoholno pice' || Naziv_Vrste === 'Topli napitak' || Naziv_Vrste === 'Sok'){
            return 'Pice';
        }
        return 'Hrana';
    }

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
                            name="name"
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
                            name="category"
                            value={category}
                            onChange={(event) => setCategory(event.target.value || "")}
                            error={!!errors.category}
                        >
                            <MenuItem value="Hrana">Hrana</MenuItem>
                            <MenuItem value="Pice">Pice</MenuItem>
                        </Select>
                        {errors.category && (
                            <Box sx={{ color: "red", fontSize: "12px" }}>
                                {errors.category}
                            </Box>
                        )}
                    </FormControl>

                    {category === "Pice" ? (
                        <FormControl required fullWidth sx={{ m: "10px" }}>
                            <InputLabel id="tip">Tip</InputLabel>
                            <Select
                                label="Tip"
                                name="type"
                                value={type}
                                onChange={(event) => setType(event.target.value || "")}
                                error={!!errors.type}
                                helperText={errors.type}
                            >
                                <MenuItem value="Alkoholno pice">Alkoholno pice</MenuItem>
                                <MenuItem value="Topli napitak">Topli napitak</MenuItem>
                                <MenuItem value="Sok">Sok</MenuItem>
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
                                name="type"
                                value={type}
                                onChange={(event) => setType(event.target.value || "")}
                                error={!!errors.type}
                            >
                                <MenuItem value="Predjelo">Predjelo</MenuItem>
                                <MenuItem value="Glavno jelo">Glavno jelo</MenuItem>
                                <MenuItem value="Dezert">Dezert</MenuItem>
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
                            name="price"
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
