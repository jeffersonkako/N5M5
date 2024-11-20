const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../utils/db');
const secretKey = 'your_secret_key';

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = getUserByUsername(username);

    if (user && user.password === password) {
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            secretKey,
            { expiresIn: '1h' }
        );
        return res.json({ token });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
};
