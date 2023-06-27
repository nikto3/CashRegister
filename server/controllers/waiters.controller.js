
const {
    getUsersQuery,
    addWaiterQuery,
    getUserByUsernameQuery,
    deleteWaiterQuery

} = require('../repository/user.repository');


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



async function addWaiter(req, res) {
    try{
        const { name, surname, username, password } = req.body;

        const userExists = await getUserByUsernameQuery(username);

        if (userExists){
            return res.status(409).end();
        }

        const result = await addWaiterQuery({name, surname, username, password});

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

async function deleteWaiter(req, res) {
    try {
        const ID = req.params.ID;

        console.log('ID:', ID);
        const result = await deleteWaiterQuery(ID);

        if (result){
            res.status(204).json({ message: 'Konobar uspjesno izbrisan' });
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
    getUsers,
    addWaiter,
    deleteWaiter
}