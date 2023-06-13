import React, {useState, useEffect} from "react";
import Bill from "./Bill.jsx";
import hotDrinksData from "../data/hotDrinks.js";
import alcoholDrinksData from "../data/alcoholDrinks.js";
import juicesData from "../data/juices.js";
import predjelaData from "../data/predjelo.js";
import glavnaJelaData from "../data/glavnoJelo.js";
import dezertiData from "../data/dezert.js";
import HotDrinks from "./drinks/HotDrinks.jsx";
import AlcoholDrinks from "./drinks/AlcoholDrinks.jsx";
import Juices from "./drinks/Juices.jsx";
import Predjela from "./food/Predjela.jsx";
import GlavnaJela from "./food/GlavnaJela.jsx";
import Dezerti from "./food/Dezerti.jsx";

export default function CashRegister({waiter}){

    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    const [activeTab, setActiveTab] = useState('drinks');

    const [hotDrinks, setHotDrinks] = useState(hotDrinksData);
    const [alcoholDrinks, setAlcoholDrinks] = useState(alcoholDrinksData);
    const [juices, setJuices] = useState(juicesData);
    const [predjela, setPredjela] = useState(predjelaData);
    const [glavnaJela, setGlavnaJela] = useState(glavnaJelaData);
    const [dezerti, setDezerti] = useState(dezertiData);

    const [activeCategory, setActiveCategory] = useState("hot");

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const renderDrinks = () => {
        switch (activeCategory) {
            case "hot":
                return <HotDrinks drinks={hotDrinks} />;
            case "alcohol":
                return <AlcoholDrinks drinks={alcoholDrinks}/>;
            case "juices":
                return <Juices drinks={juices}/>;
            default:
                return null;
        }
    };

    const renderFood = () => {
        switch(activeCategory){
            case "predjelo":
                return <Predjela foodArr={predjela}/>;
            case "glavnoJelo":
                return <GlavnaJela foodArr={glavnaJela} />;
            case "dezerti":
                return <Dezerti foodArr={dezerti}/>;
            default:
                return null;
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    function handleTabClick(tab){
        setActiveTab(tab);
    }

    return (
        <div className="h-screen bg-gray-200">
            {/* Header */}
            <header className="bg-blue-500 text-white py-4 px-8">
                <h1 className="text-4xl font-bold">Kasa</h1>
                {waiter && <p className="text-lg">
                    Konobar: <span className="font-semibold">{waiter.name}</span>
                </p>}
                <p className="text-lg">
                    Datum: <span className="font-semibold">{currentDate}</span>
                </p>
                <p className="text-lg">
                    Vrijeme: <span className="font-semibold">{currentTime}</span>
                </p>
            </header>

            {/* Main Content */}
            <div className="flex-grow p-6">
                <div className="grid grid-cols-3 gap-4">
                    {/* Tabs */}
                    <div className="col-span-2 bg-white shadow-md rounded-md p-6">
                        <div className="flex mb-4">
                            <button
                                className={`px-4 py-2 mr-2 ${
                                    activeTab === 'drinks' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                                } rounded-md`}
                                onClick={() => handleTabClick('drinks')}
                            >
                                Pice
                            </button>
                            <button
                                className={`px-4 py-2 ${
                                    activeTab === 'food' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                                } rounded-md`}
                                onClick={() => handleTabClick('food')}
                            >
                                Hrana
                            </button>
                        </div>


                        {activeTab === 'drinks'
                        ?

                            (<div>
                                <div>
                                <button
                                    onClick={() => handleCategoryClick("hot")}
                                    className={`m-2 ${
                                        activeCategory === "hot" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                                    } px-4 py-2 rounded-md`}
                                >
                                    Hot Drinks
                                </button>
                                <button
                                    onClick={() => handleCategoryClick("alcohol")}
                                    className={`m-2 ${
                                        activeCategory === "alcohol" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                                    } px-4 py-2 rounded-md`}
                                >
                                    Alcohol Drinks
                                </button>
                                <button
                                    onClick={() => handleCategoryClick("juices")}
                                    className={`m-2 ${
                                        activeCategory === "juices" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                                    } px-4 py-2 rounded-md`}
                                >
                                    Juices
                                </button>
                            </div>
                            <div>{renderDrinks()}</div>
                        </div>) :

                            (<div>
                                <div>
                                    <button
                                        onClick={() => handleCategoryClick("predjelo")}
                                        className={`m-2 ${
                                            activeCategory === "predjelo" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                                        } px-4 py-2 rounded-md`}
                                    >
                                        Predjela
                                    </button>
                                    <button
                                        onClick={() => handleCategoryClick("glavnoJelo")}
                                        className={`m-2 ${
                                            activeCategory === "glavnoJelo" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                                        } px-4 py-2 rounded-md`}
                                    >
                                        Glavna jela
                                    </button>
                                    <button
                                        onClick={() => handleCategoryClick("dezerti")}
                                        className={`m-2 ${
                                            activeCategory === "dezerti" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                                        } px-4 py-2 rounded-md`}
                                    >
                                        Dezerti
                                    </button>
                                </div>
                                <div>{renderFood()}</div>
                            </div>)}

                    </div>

                    {/* Bill Component */}
                    <Bill />
                </div>
            </div>
        </div>
    );
}