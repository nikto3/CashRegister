
// pica
const {getAlcoholDrinksQuery} = require('../repository/drinks/alchoholDrinks.repository');
const {getHotDrinksQuery} = require('../repository/drinks/hotDrinks.repository');
const {getJuicesQuery} = require('../repository/drinks/juices.repository');

//hrana
const {getAppetizersQuery} = require('../repository/food/appetizer.repository');
const {getMainCoursesQuery} = require('../repository/food/main.course.repository');
const {getDessertsQuery} = require('../repository/food/dessert.repository');


// alkoholna pica
async function getAlcoholDrinks(req, res){
    try{
        const alcoholDrinks = await getAlcoholDrinksQuery();

        if (alcoholDrinks){
            res.status(200).json(alcoholDrinks);
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({ message: 'Error on server side' });
    }
}

// topli napici
async function getHotDrinks(req, res){
    try{
        const hotDrinks = await getHotDrinksQuery();

        if (hotDrinks){
            res.status(200).json(hotDrinks);
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({ message: 'Error on server side' });
    }
}

// sokovi
async function getJuices(req, res){
    try{
        const juices = await getJuicesQuery();

        if (juices){
            res.status(200).json(juices);
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({ message: 'Error on server side' });
    }
}

// predjela
async function getAppetizers(req, res){
    try{
        const appetizers = await getAppetizersQuery();

        if (appetizers){
            res.status(200).json(appetizers);
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({ message: 'Error on server side' });
    }
}

// glavna jela
async function getMainCourses(req, res){
    try{
        const mainCourses = await getMainCoursesQuery();

        if (mainCourses){
            res.status(200).json(mainCourses);
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({ message: 'Error on server side' });
    }
}

// dezerti
async function getDesserts(req, res){
    try{
        const desserts = await getDessertsQuery();

        if (desserts){
            res.status(200).json(desserts);
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({ message: 'Error on server side' });
    }
}

module.exports = { getAlcoholDrinks,
                    getHotDrinks,
                    getJuices,
                    getAppetizers,
                    getMainCourses,
                    getDesserts };
