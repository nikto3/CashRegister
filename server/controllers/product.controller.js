const { deleteProductQuery } = require('../repository/products.repository');

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

module.exports = {
    deleteProduct
}