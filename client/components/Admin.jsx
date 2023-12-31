import React, { useState, useEffect } from "react";
import { useNavigate, redirect, useLoaderData, useLocation } from "react-router-dom";
import {
    Container,
    Typography,
    Button,
    Grid,
    Paper,
    Dialog,
    Snackbar,
    AppBar,
    Toolbar
} from "@mui/material";

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
        const res = await fetch('http://localhost:3000/auth/admin',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });

        if (res.ok) {
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

        return redirect('/?message=Morate biti ulogovani');
    } catch (e) {
        console.log(e);

        return redirect('/?message=Morate biti ulogovani');
    }
}


export default function Admin() {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openProductsDialog, setOpenProductsDialog] = useState(false);
    const [openWaitersDialog, setOpenWaitersDialog] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const [adminName, setAdminName] = useState(location.state?.user.Ime);
    const [currentTime, setCurrentTime] = useState("");
    const [picture, setPicture] = useState(null);

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

    const onAddProduct = (product) => {
        setOpenProductsDialog(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);

        setOpenProductsDialog(true);
    };
    const onAddWaiter = (waiter) => {
        // setSelectedWaiter(waiter);
        setOpenWaitersDialog(true);
    };

    const handleDeleteProduct = async (productId) => {

        try {
            const res = await fetch(`http://localhost:3000/products/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });

            if (res.ok){
                setSuccessMessage("Proizvod uspješno obrisan");

                setProducts(prevProducts => (
                    prevProducts.filter((product) => product.ID !== productId)
                ));
                setFilteredProducts(prevProducts => (
                    prevProducts.filter((product) => product.ID !== productId)
                ));
            }
            else {
                setErrorMessage('Nije moguće obrisati proizvod');
            }
        }
        catch (e) {
            setErrorMessage('Nije moguće obrisati proizvod');
            console.log(e);
        }
        finally {
            setSelectedProduct(null);
        }
    };

    const handleDeleteWaiter = async (waiterId) => {
        // Delete waiter with the given ID from the server
        try {
            const res = await fetch(`http://localhost:3000/waiters/${waiterId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            })

            if (res.ok){
                setSuccessMessage("Konobar uspješno obrisan.");
                setWaiters(prevWaiters => (
                    prevWaiters.filter(waiter => waiter.ID !== waiterId)
                ));

                setFilteredWaiters(prevWaiters => (
                    prevWaiters.filter(waiter => waiter.ID !== waiterId)
                ));
            }
            else Š
            setErrorMessage('Nije moguće obrisati korisnika');
        }
        catch (e) {
            console.log(e);
            setErrorMessage("Nije moguće obrisati korisnika");
        }
    };


    function handleLogout(){
        Cookies.remove('token');
        navigate('/');
    }

    const handleProductSearch = (searchName, searchCategory, searchType) => {
        // Perform search based on search criteria
        let filteredProducts = products.filter((product) => {
            console.log('Proizvod', product)
            const nameMatch = searchName === '' || product.Naziv.toLowerCase().includes(searchName.toLowerCase());
            console.log('Name match', nameMatch);
            // product nema atribut category za sada
            const categoryMatch = searchCategory === '' ||  product.Naziv_Kat === searchCategory;
            console.log('Category match', categoryMatch);
            const typeMatch = searchType === '' || product.Naziv_Vrste === searchType;
            console.log('Type match', typeMatch);

            console.log('nameMatch && categoryMatch && typeMatch:', nameMatch && categoryMatch && typeMatch);
            return nameMatch && categoryMatch && typeMatch;
        });

        console.log(filteredProducts);
        setFilteredProducts(filteredProducts);

    };

    function handleWaiterSearch(searchName, searchUsername){
        let filteredWaiters = waiters.filter((waiter) => {
           const nameMatch = searchName === '' || waiter.Ime.toLowerCase().includes(searchName.toLowerCase());

           const usernameMatch = searchUsername === '' || waiter.Username.toLowerCase().includes(searchUsername.toLowerCase());

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
                            onAddWaiter={() => onAddWaiter(null)}
                            onSearch={handleWaiterSearch}
                        />
                        <WaitersTable
                            waiters={filteredWaiters}
                            onDelete={handleDeleteWaiter}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <Paper>
                        <ProductsHeading
                            onSearch={handleProductSearch}
                            onAddProduct={() => onAddProduct(null)}
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
                <ProductsDialog
                    setOpenDialog={setOpenProductsDialog}
                    setProducts={setProducts}
                    setFilteredProducts={setFilteredProducts}
                    pID={selectedProduct ? selectedProduct.ID : ''}
                    pName={selectedProduct ? selectedProduct.Naziv : ''}
                    pCategory={selectedProduct ? selectedProduct.Naziv_Kat : ''}
                    pType={selectedProduct ? selectedProduct.Naziv_Vrste : ''}
                    pPrice={ selectedProduct ? selectedProduct.Cijena : ''}
                    setSelectedProduct={setSelectedProduct}
                    setSuccessMessage={setSuccessMessage}
                    setFailureMessage={setErrorMessage}
                    pPicture={picture}
                />
            </Dialog>
            <Dialog open={openWaitersDialog} onClose={() => setOpenWaitersDialog(false)}>
                <WaitersDialog
                    setOpenDialog={setOpenWaitersDialog}
                    setWaiters={setWaiters}
                    setFilteredWaiters={setFilteredWaiters}
                    setSuccessMessage={setSuccessMessage}
                />
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
