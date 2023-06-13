const jwt = require("jsonwebtoken");
const {getWaiterByUsernameQuery} = require("../repository/waiter.repository");


module.exports = async function(token){

    return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.SECRET, {algorithms: ['HS256']},async (err, decoded) => {

            if (!decoded){
                return reject('Token not recognized.');
            }
            if (err){
                return reject('Unexpected Error');
            }
            const username = decoded.username;
            const waiter = await getWaiterByUsernameQuery(username);
            resolve(waiter);

        });
    });
}