const { deleteProductQuery,
    addProductQuery,
    updateProductQuery ,
    getProductsTodayQuery
} = require('../repository/products.repository');

const { insertPreviousProductInfoQuery } = require('../repository/backup.repository');

const path = require('path');
async function deleteProduct(req, res){
    try{
        const ID = req.params.ID;

        const result = await deleteProductQuery(ID);

        if (result){
            res.status(204).json({ message: 'Product successfully deleted' });
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

async function addProduct(req, res) {
    try {
        const { name, price, type } = req.body;
        let picturePath = req.file ? req.file.path : null;
        console.log('req.body u addProduct', req.body);


        picturePath = req.file ? path.basename(picturePath) : null;
        console.log('Dodavanje proizvoda', name, price, type);

        const result = await addProductQuery({name, price, type, picturePath});

        if (result){
            res.status(201).json(result);
        }
        else {
            res.status(500).end();
        }
    }

    catch(e){
        console.log(e);
        res.status(500).end();
    }
}

async function updateProduct(req, res) {
    try{
        const { ID, name, price, type } = req.body;

        console.log('Update proizvoda', ID, name, price, type);
        console.log('req.body', req.body);

        const backupMade = await insertPreviousProductInfoQuery(ID);

        if (!backupMade){
            return res.status(500).end();
        }

        const result = await updateProductQuery({ ID, name, price, type });

        if (result){
            res.status(200).end();
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

async function getProductsToday(req, res) {
    try {
        const result = await getProductsTodayQuery();

        if (result){
            console.log('Result:',result);
            res.status(200).json(result);
        }
        else {
            res.status(500).end();
        }
    }
    catch (e) {
        console.log('Error in getProductsToday', e);
        res.status(500).end();
    }
}

module.exports = {
    deleteProduct,
    addProduct,
    updateProduct,
    getProductsToday
}