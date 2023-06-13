import React from "react";

export default function Bill(){
    return (
        <div className="col-span-1 bg-white shadow-md rounded-md p-6">
            <div className="flex justify-center items-center w-full">
                <h2 className="text-lg font-bold mb-4">Racun</h2>
            </div>
            <div className=" flex items-start flex-col border-2 w-full">
                {/* Display bill items here */}
                <h1>Item 1</h1>
                <h1>Item 2</h1>
                <h1>Item 3</h1>
                <h1>Item 4</h1>
            </div>
        </div>
    )
}