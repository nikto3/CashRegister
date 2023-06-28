const { reportIsPrintedQuery, addReportQuery } = require('../repository/report.repository');

async function reportIsPrinted(req, res){
    try {
        const result = await reportIsPrintedQuery();

        if (result){
            res.status(200).json({ printed: true });
        }
        else {
            res.status(200).json({ printed: false });
        }
    }

    catch (e) {
        console.log(e);
        res.status(500).end();
    }
}

async function addReport(req, res) {
    try {
        const { waiterID } = req.params;

        const result = await addReportQuery(waiterID);

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
    reportIsPrinted,
    addReport
}