const jwt = require('jsonwebtoken');
const db = require('../utils/db');
const SECRET_KEY = 'your_secret_key';

function login(req, res) {
  const { username, password } = req.body;

  const user = db.users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
}

function register(req, res) {
  const { username, password, role } = req.body;
  if (db.users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = { id: db.users.length + 1, username, password, role };
  db.users.push(newUser);
  res.status(201).json({ message: 'User registered', user: newUser });
}

function refreshToken(req, res) {
  const oldToken = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(oldToken, SECRET_KEY, { ignoreExpiration: true });
  const newToken = jwt.sign({ id: decoded.id, role: decoded.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token: newToken });
}

module.exports = { login, register, refreshToken };
