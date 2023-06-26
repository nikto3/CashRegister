
export async function getAppetizers(cookie){
    try {
        const appetizersData = await fetch('http://localhost:3000/food/appetizers',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });
        const appetizers = await appetizersData.json();

        return appetizers;
    }
    catch (e){
        console.log('Error in getAppetizers:', e);
        throw e;
    }
}