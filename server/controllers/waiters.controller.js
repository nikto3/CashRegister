
const { getUsersQuery } = require('../repository/user.repository');


async function getUsers(req, res){
    try {
        const users = await getUsersQuery();

        if (users){
            res.status(200).json(users);
        }
        else {
            res.status(404).json({ message: 'Users not found' })
        }

    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error on server side' });
    }
}

module.exports = { getUsers }