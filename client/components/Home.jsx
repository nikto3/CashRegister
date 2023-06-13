import React, {useEffect} from "react";
import { useState } from "react";
import {useCookies} from "react-cookie";
import jwt_decode from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faLock} from "@fortawesome/free-solid-svg-icons";

export default function Home(){

    const [user, setUser] = useState({ username: '', password: '' });
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [isValid, setIsValid] = useState(() => isTokenValid(cookies.token));


    function getHeader(){
        return  isValid
            ? {
                Authorization: `Bearer ${cookies.token}`,
                'Content-Type': 'application/json'
            }
            : {'Content-Type': 'application/json'}
    }

    useEffect(() => {
        const token = cookies.token;

        if (token && isTokenValid(token)){
            setIsValid(true);
            console.log('Novi token',token);
        }


        return () => setIsValid(false);

    }, [cookies.token]);

    useEffect(() => {
        fetch('http://localhost:3000/login'
            ,{
            headers: getHeader()
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }, []);

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

    function getCashRegister(){
        fetch('http://localhost:3000/cash-register',
            {
                headers: getHeader()
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    function onSubmit(event){
        event.preventDefault();

        if (!user.username || !user.password) return;

        fetch('http://localhost:3000/login',
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
                    throw new Error('Not authorized.')
                }
            }).then(data => {
                const {token} = data;

                if (token) {
                    setCookie('token', token, {path: '/', maxAge: 3600});
                }

                getCashRegister();

        })
            .catch(err => {
                console.log(err);
            })
        ;


        setUser({ username: '', password: '' });
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="flex items-center justify-center h-screen">
                <div className="w-full max-w-lg">
                    <form className="bg-blue-500 shadow-md rounded px-10 pt-14 pb-16 mb-4">
                        <div className="w-full flex justify-center text-3xl pb-2 text-white"><h1>Cafe Bar Djir</h1></div>
                        <div className="mb-4 py-2">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                                <FontAwesomeIcon icon={faUser} className="mr-2" />
                                Korisničko ime
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                name="username"
                                placeholder="Korisničko ime"
                                value={user.username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-6 py-2">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                                <FontAwesomeIcon icon={faLock} className="mr-2" />
                                Šifra
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Šifra"
                                value={user.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className=" flex items-center justify-center">
                            <button
                                className="bg-white w-full text-blue-500 font-bold py-2 px-4 rounded focus:shadow-outline transform transition-transform hover:-translate-y-0.5"
                                onClick={onSubmit}
                            >
                                Uloguj se
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}