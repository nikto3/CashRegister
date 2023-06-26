
export async function getHotDrinks(cookie){
    try {
        const hotData = await fetch('http://localhost:3000/drinks/hot',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });
        const hot = await hotData.json();

        return hot;
    }
    catch (e){
        console.log('Error in getHotDrinks:', e);
        throw e;
    }
}