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
                                           setFailureMessage,
                                            pPicture
                                       }) {
    const [ID, setID] = useState(pID);
    const [name, setName] = useState(pName);
    const [category, setCategory] = useState(pCategory);
    const [type, setType] = useState(pType);
    const [price, setPrice] = useState(pPrice);
    const [errors, setErrors] = useState({});
    const [picture, setPicture] = useState(pPicture);


    const handlePictureChange = (files) => {
        if (files.length > 0) {
            const file = files[0];
            // Perform any additional validation or processing here if needed
            console.log(file);
            setPicture(file);
        } else {
            setPicture(null);
        }
    };


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
        if (price === '') {
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

            console.log('To add:', toAdd);
            try{

                const header = {
                    Authorization: `Bearer ${cookie}`
                }

                const formData = new FormData();
                formData.append('ID', ID);
                formData.append('name', name);
                formData.append('price', price);
                formData.append('type', type);
                if (toAdd){
                    formData.append('picture', picture);

                }
                else {
                    header['Content-Type'] = 'application/json'
                }
                console.log('ID:', ID);
                console.log('name:', name);
                console.log('price:', price);
                console.log('type:', type);
                console.log('picture', picture)
                const method = toAdd ? 'POST' : 'PUT';
                console.log('method', method);


                console.log('formData: ', formData);
                const res = await fetch(`http://localhost:3000/products`,{
                    method,
                    headers: header,
                    body: toAdd
                        ? formData
                        : JSON.stringify({
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
                    setFailureMessage('Greška prilikom upisivanja novog proizvoda');
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

                    {toAdd && (
                        <FormControl fullWidth sx={{ m: "10px" }}>
                            <label htmlFor="picture">
                                <input
                                    type="file"
                                    id="picture"
                                    aria-label="Odaberi sliku"
                                    name="picture"
                                    style={{ display: 'none' }}
                                    onChange={(event) => handlePictureChange(event.target.files)}
                                />
                                <Button variant="outlined" component="span">
                                    Odaberi sliku
                                </Button>
                            </label>
                        </FormControl>
                    )}


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
                    Izađi
                </Button>
                <Button
                    color="primary"
                    startIcon={<Check />}
                    onClick={handleSave}
                >
                    Sačuvaj
                </Button>
            </DialogActions>
        </>
    );
}
