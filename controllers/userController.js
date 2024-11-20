const { getAllUsers } = require('../utils/db');

exports.getUsers = (req, res) => {
    const users = getAllUsers();
    res.json(users);
};
