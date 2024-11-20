const users = [
  { id: 1, username: 'admin', password: '123456', role: 'admin' },
  { id: 2, username: 'user', password: 'password', role: 'user' }
];

exports.getUserByUsername = (username) => users.find(u => u.username === username);
exports.getAllUsers = () => users;
