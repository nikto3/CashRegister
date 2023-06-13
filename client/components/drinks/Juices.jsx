import React from "react";
import Item from "../Item.jsx";

export default function Juices({ drinks }){
    return (
        <div className="p-4 border rounded-md shadow-md">
            <h2 className="text-xl font-semibold"
                style={{margin: '1rem'}}>
                Juices
            </h2>
            <div className="grid grid-cols-3 gap-4">
                {drinks.map((drink) => (
                    <Item key={drink.ID} id={drink.ID} name={drink.Naziv} price={drink.Cijena} />
                ))}
            </div>
        </div>
    );
}