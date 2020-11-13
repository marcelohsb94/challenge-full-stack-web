module.exports = {
	"up": "CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, "+
								"name varchar(80) NOT NULL, "+
								"login varchar(20) NOT NULL UNIQUE,"+
								"password CHAR(60) BINARY NOT NULL)",
    "down": "DROP TABLE users"
}
