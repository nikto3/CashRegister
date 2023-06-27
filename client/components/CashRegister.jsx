import React, { useState, useEffect } from "react";
import {useNavigate, useLocation, redirect, useLoaderData} from "react-router-dom";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import moment from "moment";
import {
    Container,
    Typography,
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Tabs,
    Tab,
} from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { ExitToApp, Print } from "@mui/icons-material";



import Menu from "./Menu";
import BillSection from "./Bill";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {getAlcoholDrinks} from "../api/getAlcoholDrinks.js";
import {getHotDrinks} from "../api/getHotDrinks.js";
import {getJuices} from "../api/getJuices.js";
import {getAppetizers} from "../api/getAppetizers.js";
import {getMainCourses} from "../api/getMainCourses.js";
import {getDesserts} from "../api/getDesserts.js";

export async function loader({ request }) {
    console.log('Pozvao sam cashRegisterLoader');
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

            return {
                alcohol,
                hot,
                juices,
                appetizers,
                mainCourses,
                desserts
            }

        }
        // dodati poruku u query
        return redirect('/?message=Morate biti ulogovani');
    } catch (e) {
        console.log(e);
        // dodati poruku u query
        return redirect('/?message=Problemi u bazi podataka');
    }
}



export default function CashRegister() {
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState("drinks");
    const [drinkType, setDrinkType] = useState("alcohol");
    const [foodType, setFoodType] = useState("predjelo");
    const [waiter, setWaiter] = useState(location.state.user);
    const [currentDateTime, setCurrentDateTime] = useState("");

    const [billItems, setBillItems] = useState([]);

    const data = useLoaderData();

    // console.log('Cash-Register component');

    const [hotDrinks, setHotDrinks] = useState(() => data.hot);
    const [alcoholDrinks, setAlcoholDrinks] = useState(() => data.alcohol);
    const [juices, setJuices] = useState(() => data.juices);
    const [predjela, setPredjela] = useState(() => data.appetizers);
    const [glavnaJela, setGlavnaJela] = useState(() => data.mainCourses);
    const [dezerti, setDezerti] = useState(() => data.desserts);

    const navigate = useNavigate();



    function onSelectItem(item) {
        const selectedBillItem = billItems.find((billItem) => billItem.id === item.id);

        if (selectedBillItem) {
            // Item already exists in the bill, increment quantity
            setBillItems((prevBillItems) => {
                return prevBillItems.map((billItem) => {
                    if (billItem.id === item.id) {
                        return { ...billItem, quantity: billItem.quantity + 1 };
                    }
                    return billItem;
                });
            });
        } else {
            // Item doesn't exist in the bill, add it with quantity 1
            const newBillItem = { ...item, quantity: 1 };
            setBillItems((prevBillItems) => [...prevBillItems, newBillItem]);
        }
    }

    function onDeleteItem(itemID){
        const itemToDelete = billItems.find(item => item.id === itemID);

        if (itemToDelete.quantity === 1){
            setBillItems(prevBillItems => {
                return billItems.filter(item => item.id !== itemID);
            })
        }

        else {
            setBillItems(prevBillItems => {
                return prevBillItems.map(billItem => {
                        if (billItem.id === itemID){
                            return {...billItem, quantity: billItem.quantity-1};
                        }
                        return billItem;
                }) ;
            });
        }
    }

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleDrinkTypeChange = (event, newValue) => {
        setDrinkType(newValue);
    };

    const handleFoodTypeChange = (event, newValue) => {
        setFoodType(newValue);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const now = moment();
            setCurrentDateTime(now.format("D/MM/YYYY HH:mm:ss"));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        Cookies.remove('token');
        console.log('Logging out...');
        navigate('/');
    };

    const handlePrintBill = () => {
        // Implement your logic for printing the bill
        console.log("Printing the bill...");
    };

    return (
        <div style={{ height: "100vh" }}>
                <div style={{ height: "100%" }}>
                    <AppBar position="static" color='default'>
                        <Toolbar>
                            <Box sx={{ flexGrow: 1, marginTop:'5px' }}>
                                <Typography variant="h6" component="div">
                                    Kasa
                                </Typography>
                                <Typography variant="subtitle1" component="div">
                                    Konobar: {waiter.Ime}
                                </Typography>
                                <Typography variant="subtitle1" component="div">
                                    Datum i vrijeme: {currentDateTime}
                                </Typography>
                            </Box>
                            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutOutlinedIcon />}>
                                Izađi
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Box sx={{ display: "flex", height: "calc(100% - 64px)" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Box sx={{ mt: 2 }}>
                                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                                    <Tab label="Piće" value="drinks" />
                                    <Tab label="Hrana" value="food" />
                                </Tabs>

                                {selectedTab === "drinks" && (
                                    <TabContext value={drinkType}>
                                        <Box sx={{ mt: 2 }}>
                                            <Tabs
                                                value={drinkType}
                                                onChange={handleDrinkTypeChange}
                                                centered
                                            >
                                                <Tab label="Alkoholna Pića" value="alcohol" />
                                                <Tab label="Topli napici" value="hot" />
                                                <Tab label="Sokovi" value="juices" />
                                            </Tabs>
                                        </Box>

                                        <TabPanel value="alcohol" index="alcohol">
                                            <Menu items={alcoholDrinks} onSelectItemFunc={onSelectItem} />
                                            {/*<AlcoholDrinksSection items={alcoholDrinks} />*/}
                                        </TabPanel>
                                        <TabPanel value="hot" index="hot">
                                            <Menu items={hotDrinks} onSelectItemFunc={onSelectItem} />
                                            {/*<HotDrinksSection items={hotDrinks} />*/}
                                        </TabPanel>
                                        <TabPanel value="juices" index="juices">
                                            <Menu items={juices} onSelectItemFunc={onSelectItem} />
                                            {/*<JuicesSection items={juices} />*/}
                                        </TabPanel>
                                    </TabContext>
                                )}

                                {selectedTab === "food" && (
                                    <TabContext value={foodType}>
                                        <Box sx={{ mt: 2 }}>
                                            <Tabs
                                                value={foodType}
                                                onChange={handleFoodTypeChange}
                                                centered
                                            >
                                                <Tab label="Predjelo" value="predjelo" />
                                                <Tab label="Glavno Jelo" value="glavnoJelo" />
                                                <Tab label="Dezert" value="dezert" />
                                            </Tabs>
                                        </Box>

                                        <TabPanel value="predjelo" index="predjelo">
                                            <Menu items={predjela} onSelectItemFunc={onSelectItem} />
                                            {/*<PredjeloSection items={predjela}/>*/}
                                        </TabPanel>
                                        <TabPanel value="glavnoJelo" index="glavnoJelo">
                                            <Menu items={glavnaJela} onSelectItemFunc={onSelectItem} />
                                            {/*<GlavnoJeloSection items={glavnaJela} />*/}
                                        </TabPanel>
                                        <TabPanel value="dezert" index="dezert">
                                            <Menu items={dezerti} onSelectItemFunc={onSelectItem} />
                                            {/*<DezertSection items={dezerti}/>*/}
                                        </TabPanel>
                                    </TabContext>
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                ml: 4,
                                flexShrink: 0,
                                minWidth: 500,
                                width: "30%",
                            }}
                        >
                            <Box sx={{ mt: 2 }}>
                                {/* Render the bill section here */}
                                <Box sx={{ height: "100%", overflowY: "auto" }}>
                                    <BillSection
                                    items={billItems}
                                    onDeleteItem={onDeleteItem}/>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </div>
            {/*)}*/}
        </div>
    );
}
