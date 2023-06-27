const { addAppetizerQuery } = require('../repository/food/appetizer.repository');
const { addMainCourseQuery } = require('../repository/food/main.course.repository');
const { addDessertQuery } = require('../repository/food/dessert.repository');

async function addAppetizer(req, res) {
    try {
        const { name, price } = req.body;

        console.log('Add alcohol drink method');
        const result = await addAppetizerQuery({name, price});

        if (result){
            res.status(201).json(result);
        }
        else {
            res.status(500).end();
        }

    }
    catch (e) {
        console.log(e);
        res.status(500).end();
    }
}
async function addMainCourse(req, res) {
    try {
        const { name, price } = req.body;

        console.log('Add alcohol drink method');
        const result = await addMainCourseQuery({name, price});

        if (result){
            res.status(201).json(result);
        }
        else {
            res.status(500).end();
        }

    }
    catch (e) {
        console.log(e);
        res.status(500).end();
    }
}

async function addDessert(req, res) {
    try {
        const { name, price } = req.body;

        console.log('Add alcohol drink method');
        const result = await addDessertQuery({name, price});

        if (result){
            res.status(201).json(result);
        }
        else {
            res.status(500).end();
        }

    }
    catch (e) {
        console.log(e);
        res.status(500).end();
    }
}


module.exports = {
    addAppetizer,
    addMainCourse,
    addDessert
}