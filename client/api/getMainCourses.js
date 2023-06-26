
export async function getMainCourses(cookie){
    try {
        const mainCoursesData = await fetch('http://localhost:3000/food/main-courses',{
            headers: {
                Authorization: `Bearer ${cookie}`
            }
        });
        const mainCourses = await mainCoursesData.json();

        return mainCourses;
    }
    catch (e){
        console.log('Error in getMainCourses:', e);
        throw e;
    }
}