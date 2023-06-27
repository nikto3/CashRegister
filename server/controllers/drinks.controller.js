
const { addAlcoholDrinkQuery, deleteAlcoholDrinkQuery } = require('../repository/drinks/alchoholDrinks.repository');
const { addHotDrinkQuery } = require('../repository/drinks/hotDrinks.repository');
const { addJuiceQuery } = require('../repository/drinks/juices.repository');

async function addAlcoholDrink(req, res) {
    try {
        const { name, price } = req.body;

        const result = await addAlcoholDrinkQuery({name, price});

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

async function addHotDrink(req, res) {
    try {
        const { name, price } = req.body;

        console.log('Add alcohol drink method');
        const result = await addHotDrinkQuery({name, price});

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
async function addJuice(req, res) {
    try {
        const { name, price } = req.body;

        console.log('Add alcohol drink method');
        const result = await addJuiceQuery({name, price});

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
    addAlcoholDrink,
    addHotDrink,
    addJuice
}