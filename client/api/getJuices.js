
export async function getJuices(cookie){
    try {
        const juicesData = await fetch('http://localhost:3000/drinks/juices',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });
        const juices = await juicesData.json();

        return juices;
    }
    catch (e){
        console.log('Error in getJuices:', e);
        throw e;
    }
}