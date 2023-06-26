
export async function getWaiters(cookie){
    try {
        const waitersData = await fetch('http://localhost:3000/waiters',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });
        const waiters = await waitersData.json();

        return waiters;
    }
    catch (e){
        console.log('Error in getMainCourses:', e);
        throw e;
    }
}