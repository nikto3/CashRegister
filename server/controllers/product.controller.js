const { deleteProductQuery, addProductQuery, updateProductQuery } = require('../repository/products.repository');

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

        console.log('Dodavanje proizvoda', name, price, type);

        const result = await addProductQuery({name, price, type});

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

module.exports = {
    deleteProduct,
    addProduct,
    updateProduct
}