
export async function getDesserts(cookie){
    try {
        const dessertsData = await fetch('http://localhost:3000/food/desserts',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });
        const desserts = await dessertsData.json();

        return desserts;
    }
    catch (e){
        console.log('Error in getDesserts:', e);
        throw e;
    }
}