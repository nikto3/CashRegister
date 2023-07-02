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


export default function ProductsDialog({
                                           setOpenDialog,
                                           setProducts,
                                           setFilteredProducts,
                                           pID,
                                           pName,
                                           pCategory,
                                           pType,
                                           pPrice,
                                           setSelectedProduct,
                                           setSuccessMessage,
                                           setFailureMessage
                                       }) {
    const [ID, setID] = useState(pID);
    const [name, setName] = useState(pName);
    const [category, setCategory] = useState(pCategory);
    const [type, setType] = useState(pType);
    const [price, setPrice] = useState(pPrice);
    const [errors, setErrors] = useState({});

    const [toAdd, setToAdd] = useState(pName === '' && pCategory === '' && pType === '' && pPrice === '');
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
        if (price.trim() === '') {
            newErrors.price = "Cijena je obavezno polje.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    function addProduct(newProduct){
        setProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product => ({ ...product }));

            const insertIndex = updatedProducts.findIndex(product => product.Naziv_Vrste === newProduct.Naziv_Vrste);

            if (insertIndex !== -1) {
                updatedProducts.splice(insertIndex, 0, newProduct);
            } else {
                updatedProducts.push({ type: newProduct.Naziv_Kat, isSection: true });
                updatedProducts.push(newProduct);
            }

            return updatedProducts;
        });


        setFilteredProducts(prevProducts => {
            const updatedProducts = prevProducts.map(product => ({ ...product }));

            const insertIndex = updatedProducts.findIndex(product => product.Naziv_Vrste === newProduct.Naziv_Vrste);

            if (insertIndex !== -1) {
                updatedProducts.splice(insertIndex, 0, newProduct);
            } else {
                updatedProducts.push({ type: newProduct.Naziv_Kat, isSection: true });
                updatedProducts.push(newProduct);
            }

            return updatedProducts;

        });

    }

    function updateProduct(newProduct){
        setProducts(prevProducts => (
            prevProducts.map(product => {
                if (product.ID === newProduct.ID){
                    return {
                        ID: newProduct.ID,
                        Naziv: newProduct.name,
                        Cijena: newProduct.price,
                        Naziv_Kat: newProduct.category,
                        Naziv_Vrste: newProduct.type
                    };
                }

                return product;
            })
        ));

        setFilteredProducts(prevProducts => (
            prevProducts.map(product => {
                if (product.ID === newProduct.ID){
                    return {
                        ID: newProduct.ID,
                        Naziv: newProduct.name,
                        Cijena: newProduct.price,
                        Naziv_Kat: newProduct.category,
                        Naziv_Vrste: newProduct.type
                    };
                }

                return product;
            })
        ));
    }

    const handleSave = async () => {
        if (validateForm()) {

            const cookie = Cookies.get('token');

            try{
                const res = await fetch(`http://localhost:3000/products`,{
                    method: toAdd ? 'POST' : 'PUT',
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            ID,
                            name,
                            price,
                            type

                        })
                })

                if (res.ok){

                    if (toAdd){
                        const newProduct = await res.json();
                        newProduct.Naziv_Kat = addCategory(newProduct.Naziv_Vrste);
                        addProduct(newProduct);
                    }
                    else {
                        updateProduct({ID, name, category, type, price});
                    }
                    setSuccessMessage('Proizvod uspješno sačuvan');
                }
                else {
                    setFailureMessage('Problem prilikom upisivanja novog proizvoda');
                }
            }
            catch(err){
                console.log(err);
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

                    <FormControl required fullWidth sx={{ m: "10px", borderColor: errors.price ? "red" : undefined }} >
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
                        {errors.price && (
                            <Box sx={{ color: "red", fontSize: "12px" }}>
                                {errors.price}
                            </Box>
                        )}
                    </FormControl>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    color="inherit"
                    startIcon={<Close />}
                    onClick={() => {
                        setOpenDialog(false);
                        setSelectedProduct(null);
                    }}
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
