
export async function getAlcoholDrinks(cookie){
    try {
        const alcoholData = await fetch('http://localhost:3000/drinks/alcohol',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });
        const alcohol = await alcoholData.json();

        return alcohol;
    }
    catch (e){
        console.log('Error in getAlcoholDrinks:', e);
        throw e;
    }
}