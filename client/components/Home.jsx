import React, {useEffect} from "react";
import { useState } from "react";
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";
import { redirect, useNavigate, useLoaderData } from "react-router-dom";

import {Container, Typography, TextField, Button, InputAdornment, Alert} from '@mui/material';
import {AccountCircle, LockOutlined} from "@mui/icons-material";
import Cookies from 'js-cookie';


export async function loader({ request }) {
    console.log('Pozvao sam homeLoader');

    const res = await fetch('http://localhost:3000');
    const data = await res.json();

    console.log(data);

    return new URL(request.url).searchParams.get("message");

}


export default function Home(){

    const [user, setUser] = useState({ username: '', password: '' });
    // const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isValid, setIsValid] = useState(() => isTokenValid(Cookies.get('token')));
    const [passwordError, setPasswordError] = useState("");

    let message = useLoaderData();


    const navigate = useNavigate();

    function getHeader(){
        return  isValid
            ? {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json'
            }
            : {'Content-Type': 'application/json'}
    }

    useEffect(() => {
        const token = Cookies.get('token');

        if (token && isTokenValid(token)){
            setIsValid(true);
            console.log('Novi token',token);
        }


        return () => {
            setIsValid(false);
        };

    }, [Cookies.get('token')]);


    function isTokenValid(token) {
        if (!token) {
            return false;
        }

        // Decode the token and check the expiration date
        const decodedToken = jwt_decode(token);
        const currentTimestamp = Date.now() / 1000;

        return decodedToken.exp > currentTimestamp;
    }



    function handleInputChange(event){
        setUser((prevUser) => {
            const { name, value } = event.target;

            return {
                ...prevUser,
                [name]: value
            }
        });
    }

    function onSubmit(event){
        event.preventDefault();
        message = "";

        if (!user.username || !user.password) return;

        if (user.password.length < 8 || user.password.length > 20){
            setPasswordError("Lozinka mora biti dužine između 8 i 20 karaktera");
            return;
        }
        else if (passwordError){
            setPasswordError("");
        }

        fetch('http://localhost:3000/',
            {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(user)
        })
            .then(res => {
                if (res.ok){
                    return res.json();
                }
                else {
                    throw new Error("User hasn't logged in");
                }
            }).then(data => {
                const { token, waiter } = data;

                if (token) {
                    Cookies.set('token', token, { path: '/' });
                }

            navigate("/cash-register", {
                state: {
                    waiter
                }
            });

        })
            .catch(err => {
                console.log("Greska." ,err);
                navigate('/?message=Netacni kredencijali');
            })
        ;


        setUser({ username: '', password: '' });
    }

    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <form
                style={{
                    width: "400px",
                    height: "350px",
                    padding: "16px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    borderRadius: "7px",
                    backgroundColor: "#fff",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
                onSubmit={onSubmit}
            >
                <Typography variant="h5" component="h1" gutterBottom>
                    Forma
                </Typography>
                <TextField
                    label="Korisničko ime"
                    variant="outlined"
                    name="username"
                    fullWidth
                    style={{ marginBottom: '16px' }}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                )
            }}
                    value={user.username}
                    onChange={handleInputChange}
                />
                <TextField
                    label="Lozinka"
                    type="password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    style={{ marginBottom: '16px' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined/>
                            </InputAdornment>
                        )
                    }}
                    value={user.password}
                    onChange={handleInputChange}
                />
                {passwordError && (
                    <Alert severity="error" style={{ marginBottom: "16px" }}>
                        {passwordError}
                    </Alert>)}
                {message && (
                    <Alert severity="error" style={{marginBottom: '10px'}}>
                        {message}
                    </Alert>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                        marginTop: '16px'}}
                >
                    Uloguj se
                </Button>
            </form>
        </Container>

    );
}