import React from "react";


export default function Item({id, name, price}){

    function handleClick(ID){
        console.log(`Clicked button with ID ${ID}`);
    }

    return (
        <div
            className="col-span-1 flex flex-col items-center bg-white rounded-md shadow"
            style={{ padding: '1rem', margin: '1rem' }}
            onClick={() => handleClick(id)}
        >
            <span className="font-semibold">{name}</span>
            <span className="text-gray-600">{price}</span>
        </div>
    );
}