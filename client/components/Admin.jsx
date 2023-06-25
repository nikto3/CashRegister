import React, { useState, useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
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

// dummy data
import hotDrinksData from "../data/hotDrinks";
import alcoholDrinksData from "../data/alcoholDrinks";
import juicessData from "../data/juices";
import predjelaData from "../data/predjelo";
import glavnaJelaData from "../data/glavnoJelo";
import dezertiData from "../data/dezert";

import waitersData from "../data/waiters"
import ProductsDialog from "./ProductsDialog.jsx";
import WaitersDialog from "./WaitersDialog.jsx";
import WaitersHeading from './WaitersHeading';
import WaitersTable from "./WaitersTable.jsx";
import ProductsHeading from "./ProductsHeading.jsx";
import ProductsTable from "./ProductsTable.jsx";

export async function loader({ request }){
    try {
        const cookie = Cookies.get('token');
        const res = fetch('http://localhost:3000/admin',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });


        if (!res.ok){
            return redirect('/?message=Nemate prava pristupa admin ruti');
        }

        /*
        * admin je identifikovan
        * saljem zahtjeve za podatke
        */

        const alcohol = fetch('http://localhost:3000/drinks/alcohol',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });
        const hot = fetch('http://localhost:3000/drinks/hot',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });
        const juices = fetch('http://localhost:3000/drinks/juices',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });

        const appetizers = fetch('http://localhost:3000/food/appetizers',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });

        const mainCourses = fetch('http://localhost:3000/food/mainCourses',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });


        const desserts = fetch('http://localhost:3000/food/desserts',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });

        return {
            alcohol: alcohol,
            hot: hot,
            juices: juices,
            appetizers: appetizers,
            mainCourses: mainCourses,
            desserts: desserts
        };

    }
    catch (e) {
        console.log('Error:', e);
        return redirect('/');
    }
}


export default function Admin() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('pice');
    const [selectedWaiter, setSelectedWaiter] = useState(null);
    const [openProductsDialog, setOpenProductsDialog] = useState(false);
    const [openWaitersDialog, setOpenWaitersDialog] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [adminName, setAdminName] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [waiters, setWaiters] = useState(waitersData);

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredWaiters, setFilteredWaiters] = useState([]);

    const [hotDrinks, setHotDrinks] = useState(hotDrinksData);
    const [alcoholDrinks, setAlcoholDrinks] = useState(alcoholDrinksData);
    const [juices, setJuices] = useState(juicessData);
    const [predjela, setPredjela] = useState(predjelaData);
    const [glavnaJela, setGlavnaJela] = useState(glavnaJelaData);
    const [dezerti, setDezerti] = useState(dezertiData);

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products and waiters data
        // fetchProducts();
        // fetchWaiters();

        // ovdje setujem podatke nakon sto ih dobijem iz loadera

        setFilteredWaiters(waiters);
        setProducts(() => {
            return [
                ...hotDrinks,
                ...alcoholDrinks,
                ...juices,
                ...predjela,
                ...glavnaJela,
                ...dezerti,
            ];
        });

        setFilteredProducts(products);

        // Set admin name
        setAdminName("Admin1");

        // Set current time
        setCurrentTime(new Date().toLocaleString());
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // const fetchProducts = () => {
    //     // Fetch products data from the server
    //     fetch("http://localhost:3000/products", {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setProducts(data))
    //         .catch((error) => console.error("Error fetching products:", error));
    // };

    // const fetchWaiters = () => {
    //     // Fetch waiters data from the server
    //     fetch("http://localhost:3000/waiters", {
    //         headers: {
    //             Authorization: `Bearer ${Cookies.get("token")}`,
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setWaiters(data))
    //         .catch((error) => console.error("Error fetching waiters:", error));
    // };

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
                fetchProducts();
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
                fetchWaiters();
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

                    <IconButton
                        aria-label="logout"
                        onClick={handleLogout}
                    >
                        <LogoutOutlinedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
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
                <Grid item xs={12} sm={6} md={8}>
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
