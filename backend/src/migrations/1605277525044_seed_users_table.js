const bcrypt = require('bcrypt');

const password = bcrypt.hashSync('123456789', 10);

module.exports = {
    "up": "INSERT INTO users (id, name, login, password) VALUES (1, 'Administrador', 'admin', '"+password+"') ",
    "down": "DELETE FROM users WHERE id = 1"
}