const { getProductPreviousInfoQuery } = require('../repository/backup.repository');

async function getProductPreviousInfo(req, res) {
    try {
        const { productID } = req.params;

        const result = await getProductPreviousInfoQuery(productID);

        if (result){
            res.status(200).json(result);
        }

        else {
            res.status(500).end();
        }
    }
    catch (e) {
        console.log('Error in getProductpreviousInfo', e);
        res.status(500).end();
    }
}

module.exports = {
    getProductPreviousInfo
}