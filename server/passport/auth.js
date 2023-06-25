const jwt = require("jsonwebtoken");
const { getuserByUsernameQuery } = require("../repository/user.repository");

module.exports = async function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.SECRET,
            { algorithms: ["HS256"], ignoreExpiration: false },
            async (err, decoded) => {
                if (err) {
                    return reject(new Error("Token verification failed."));
                }
                const username = decoded.username;
                const user = await getuserByUsernameQuery(username);
                resolve(user);
            }
        );
    });
};
