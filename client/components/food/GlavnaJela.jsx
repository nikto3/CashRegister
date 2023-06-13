import React from "react";
import Item from "../Item.jsx";

export default function GlavnaJela({ foodArr }){
    return (
        <div className="p-4 border rounded-md shadow-md">
            <h2 className="text-xl font-semibold"
                style={{margin: '1rem'}}>
                Glavna jela
            </h2>
            <div className="grid grid-cols-3 ">
                {foodArr.map((food) => (
                    <Item key={food.ID} id={food.ID} name={food.Naziv} price={food.Cijena} />
                ))}
            </div>
        </div>
    );
}