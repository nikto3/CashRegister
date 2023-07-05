import React, {useEffect} from "react";
import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";

import {Container, Typography, TextField, Button, InputAdornment, Alert, ThemeProvider} from '@mui/material';
import {AccountCircle, LockOutlined} from "@mui/icons-material";
import Cookies from 'js-cookie';

import background from "../src/assets/Pozadina.jpeg";


export function loader({ request }) {

    return new URL(request.url).searchParams.get("message");
}


export default function Home({ theme }){

    const [user, setUser] = useState({ username: '', password: '' });
    const [passwordError, setPasswordError] = useState("");

    let message = useLoaderData();

    const navigate = useNavigate();

    function getHeader(){
        return  {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json'
        }
    }

    function redirectUser(user){
        if (user.Naziv_Uloge === 'Konobar'){
            navigate("/cash-register", {
                state: {
                    user
                }
            });
        }
        else {
            navigate("/admin", {
                state: {
                    user
                }
            });
        }
    }

    useEffect( () => {
        console.log('Pokrecem useEffect()');
        fetch('http://localhost:3000/', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })
            .then(res => res.json())
            .then(user => {
                if (user){
                    console.log('Korisnik vec ulogovan', user);
                    redirectUser(user);
                }
            })
            .catch(err => console.log(err.message));
    }, []);


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
                    throw new Error("Netačno korisničko ime ili lozinka");
                }
            }).then(data => {
                const { token, user } = data;

                if (token) {
                    Cookies.set('token', token, { path: '/' });
                }


                if (user.Naziv_Uloge === 'Konobar'){
                    navigate("/cash-register", {
                        state: {
                            user
                        }
                    });
                }
                else {
                    navigate("/admin", {
                        state: {
                            user
                        }
                    });
                }

        })
            .catch(err => {
                console.log("Greska." ,err.message);
                navigate(`/?message=${err.message}`);
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
                margin: '0px',
                maxWidth: '1920px',
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <form
                style={{
                    width: "400px",
                    height: "350px",
                    padding: "16px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    borderRadius: "7px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
                onSubmit={onSubmit}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                >
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
                    <Alert severity="error" style={{ marginBottom: "16px", opacity: 0.8 }}>
                        {passwordError}
                    </Alert>)}
                {message && (
                    <Alert severity="error" style={{marginBottom: '10px', opacity: 0.8 }}>
                        {message}
                    </Alert>
                )}
                <Button
                    type="submit"
                    variant="outlined"
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