const auth = require('../passport/auth');

const requestAdminAuth = async (req, res, next) => {

    console.log('requestAdminAuth');
    let token = req.headers.authorization;

    if (!token){
        res.status(401).json({ message: 'User is not logged in' });
    }

    token = token.split(' ')[1];

    console.log(token);

    try {
        const user = await auth(token);

        if (user?.Naziv_Uloge === 'Admin'){
            return next();
        }

        else {
            res.status(401).json({ message: 'User not recognized' })
        }
    }
    catch (err){
        console.log(err);
        res.status(500).end();
    }
};


const requestAuth = async (req, res, next) => {

    console.log('requestAuth');
    let token = req.headers.authorization;

    if (!token){
        res.status(401).json({ message: 'User is not logged in' });
    }

    token = token.split(" ")[1];
    console.log(token);
    try {
        const user = await auth(token);

        if (user){
            return next();
        }
        else {
            res.status(401).json({ message: 'User not recognized' })
        }
    }
    catch (err){
        console.log(err);
        res.status(500).end();
    }

};

module.exports = { requestAuth, requestAdminAuth }