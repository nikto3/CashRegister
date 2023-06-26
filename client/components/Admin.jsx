import React, { useState, useEffect } from "react";
import { useNavigate, redirect, useLoaderData } from "react-router-dom";
import {
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    AppBar,
    Toolbar, Box, OutlinedInput, FilledInput,
} from "@mui/material";
import {
    AddCircleOutline,
    Edit,
    Delete,
    Close,
    Check,
} from "@mui/icons-material";
import Cookies from "js-cookie";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import moment from "moment";


import ProductsDialog from "./ProductsDialog.jsx";
import WaitersDialog from "./WaitersDialog.jsx";
import WaitersHeading from './WaitersHeading';
import WaitersTable from "./WaitersTable.jsx";
import ProductsHeading from "./ProductsHeading.jsx";
import ProductsTable from "./ProductsTable.jsx";
import {getAlcoholDrinks} from "../api/getAlcoholDrinks.js";
import {getHotDrinks} from "../api/getHotDrinks.js";
import {getJuices} from "../api/getJuices.js";
import {getAppetizers} from "../api/getAppetizers.js";
import {getMainCourses} from "../api/getMainCourses.js";
import {getDesserts} from "../api/getDesserts.js";
import {getWaiters} from "../api/getWaiters.js";

export async function loader({ request }) {
    console.log('Pozvao sam adminLoader');
    try {
        const cookie = Cookies.get('token');
        const res = await fetch('http://localhost:3000/auth',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });

        if (res.ok) {
            // return null;
            console.log('res.ok');
            const alcohol = await getAlcoholDrinks(cookie);
            const hot = await getHotDrinks(cookie);
            const juices = await getJuices(cookie);
            const appetizers = await getAppetizers(cookie);
            const mainCourses = await getMainCourses(cookie);
            const desserts = await getDesserts(cookie);
            const waiters = await getWaiters(cookie);

            return {
                alcohol,
                hot,
                juices,
                appetizers,
                mainCourses,
                desserts,
                waiters
            }

        }
        // dodati poruku u query
        return redirect('/?message=Morate biti ulogovani');
    } catch (e) {
        console.log(e);
        // dodati poruku u query
        return redirect('/?message=Morate biti ulogovani');
    }
}


export default function Admin() {
    const [selectedProduct, setSelectedProduct] = useState('pice');
    const [selectedWaiter, setSelectedWaiter] = useState(null);
    const [openProductsDialog, setOpenProductsDialog] = useState(false);
    const [openWaitersDialog, setOpenWaitersDialog] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [adminName, setAdminName] = useState("Admin1");
    const [currentTime, setCurrentTime] = useState("");

    const data = useLoaderData();

    const [hotDrinks, setHotDrinks] = useState(() => data.hot);
    const [alcoholDrinks, setAlcoholDrinks] = useState(() => data.alcohol);
    const [juices, setJuices] = useState(() => data.juices);
    const [predjela, setPredjela] = useState(() => data.appetizers);
    const [glavnaJela, setGlavnaJela] = useState(() => data.mainCourses);
    const [dezerti, setDezerti] = useState(() => data.desserts);

    const [waiters, setWaiters] = useState(() => data.waiters);


    const [filteredWaiters, setFilteredWaiters] = useState(() => waiters);

    const [products, setProducts] = useState(() => (
        [
            ...hotDrinks,
            ...alcoholDrinks,
            ...juices,
            ...predjela,
            ...glavnaJela,
            ...dezerti,
        ]
    ));

    const [filteredProducts, setFilteredProducts] = useState(products);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = moment();
            setCurrentTime(now.format('D/MM/YYYY HH:mm:ss'));
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);


    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setOpenProductsDialog(true);
    };

    const handleEditWaiter = (waiter) => {
        setSelectedWaiter(waiter);
        // setOpenDialog(true);
        setOpenWaitersDialog(true);
    };

    const handleDeleteProduct = (productId) => {
        // Delete product with the given ID from the server
        fetch(`http://localhost:3000/products/:${productId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
            .then(() => {
                setSuccessMessage("Product deleted successfully.");
                fetchProducts();
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
                setErrorMessage("Failed to delete product.");
            });
    };

    const handleDeleteWaiter = (waiterId) => {
        // Delete waiter with the given ID from the server
        fetch(`http://localhost:3000/waiters/:${waiterId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        })
            .then(() => {
                setSuccessMessage("Waiter deleted successfully.");
                fetchWaiters();
            })
            .catch((error) => {
                console.error("Error deleting waiter:", error);
                setErrorMessage("Failed to delete waiter.");
            });
    };

    const handleSaveProduct = (product) => {
        // Save the product to the server
        fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(product),
        })
            .then(() => {
                setSuccessMessage("Product saved successfully.");
                //fetchProducts();
            })
            .catch((error) => {
                console.error("Error saving product:", error);
                setErrorMessage("Failed to save product.");
            });
    };

    const handleSaveWaiter = (waiter) => {
        // Save the waiter to the server
        fetch("http://localhost:3000/waiters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(waiter),
        })
            .then(() => {
                setSuccessMessage("Waiter saved successfully.");
                //fetchWaiters();
            })
            .catch((error) => {
                console.error("Error saving waiter:", error);
                setErrorMessage("Failed to save waiter.");
            });
    };

    function handleLogout(){
        Cookies.remove('token');
        navigate('/');
    }

    const handleProductSearch = (searchName, searchCategory, searchType) => {
        // Perform search based on search criteria
        let filteredProducts = products.filter((product) => {
            const nameMatch = searchName === null || product.Naziv.toLowerCase().includes(searchName.toLowerCase());
            // product nema atribut category za sada
            // const categoryMatch = searchCategory === null ||  product.category === searchCategory;
            // const typeMatch = searchType === null || product.type === searchType;
            return nameMatch;
        });

        setFilteredProducts(filteredProducts);

    };

    function handleWaiterSearch(searchName, searchUsername){
        let filteredWaiters = waiters.filter((waiter) => {
           const nameMatch = searchName === null || waiter.Ime.toLowerCase().includes(searchName.toLowerCase());

           const usernameMatch = searchUsername === null || waiter.Username.toLowerCase().includes(searchUsername.toLowerCase());

           return nameMatch && usernameMatch
        });

        setFilteredWaiters(filteredWaiters);
    }

    return (
        <Container maxWidth="xl">
            <AppBar position="sticky" color="default" sx={{ marginTop: '15px' }}>
                <Toolbar>
                    <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                        Admin: {adminName}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                        {currentTime}
                    </Typography>

                    <Button
                        onClick={handleLogout}
                        startIcon={<LogoutOutlinedIcon />}
                        sx={{
                            color: 'black'
                        }}
                    >
                        IZAĐI
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={5}>
                    <Paper>
                        <WaitersHeading
                            onAddWaiter={() => handleEditWaiter(null)}
                            onSearch={handleWaiterSearch}
                        />
                        <WaitersTable
                            waiters={filteredWaiters}
                            onEdit={handleEditWaiter}
                            onDelete={handleDeleteWaiter}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <Paper>
                        <ProductsHeading
                            onSearch={handleProductSearch}
                            onAddProduct={() => handleEditProduct(null)}
                        />
                       <ProductsTable
                            products={filteredProducts}
                            handleEditProduct={handleEditProduct}
                            handleDeleteProduct={handleDeleteProduct}
                       />
                    </Paper>
                </Grid>
            </Grid>
            <Dialog open={openProductsDialog} onClose={() => setOpenProductsDialog(false)}>
                <ProductsDialog setOpenDialog={setOpenProductsDialog} />
            </Dialog>
            <Dialog open={openWaitersDialog} onClose={() => setOpenWaitersDialog(false)}>
                <WaitersDialog setOpenDialog={setOpenWaitersDialog} />
            </Dialog>
            <Snackbar
                open={successMessage !== ""}
                autoHideDuration={5000}
                onClose={() => setSuccessMessage("")}
                message={successMessage}
            />
            <Snackbar
                open={errorMessage !== ""}
                autoHideDuration={5000}
                onClose={() => setErrorMessage("")}
                message={errorMessage}
            />
        </Container>
    );
}
