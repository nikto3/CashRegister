const { addBillQuery,
    addBillProductQuery,
    getBillsQuery,
    updateBillProductQuery
} = require('../repository/bill.repository');

async function addBill(req, res, next) {
    try {
        const waiterID = req.params.waiterID;

        const result = await addBillQuery(waiterID);

        if (result){
            res.status(201).json(result);
        }
        else {
            res.status(500).end();
        }
    }
    catch (e){
        console.log(e);
        res.status(500).end();
    }
}

async function addBillProduct(req, res){
    try {
        const billItems = req.body;
        const billID = req.params.billID;

        for (const billItem of billItems) {
            const result = await addBillProductQuery(billID, billItem);

            if (!result) {
                throw new Error('Greska prilikom dodavanja u tabelu Racun_proizvod');
            }
        }

        res.status(200).end();
    }
    catch (e) {
        console.log(e);
        res.status(500).end();
    }
}

async function getBills(req, res){
    try {
        const result = await getBillsQuery();

        if (result){
            res.status(200).json(result);
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

async function updateBillProduct(req, res) {
    try {
        const { reportID } = req.params;
        const { billIDs } = req.body;

        for (const billID of billIDs) {

            const result = await updateBillProductQuery(reportID, billID);

            if (!result){
                throw new Error('Error when trying to update Racun_proizvod table');
            }
        }

        res.status(204).end();
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    addBill,
    addBillProduct,
    getBills,
    updateBillProduct
}