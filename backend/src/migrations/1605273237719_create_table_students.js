module.exports = {
	"up": "CREATE TABLE students (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, "+
								 "name VARCHAR(100) NOT NULL, "+
								 "email VARCHAR(100) NOT NULL UNIQUE, "+
								 "ra VARCHAR(9) NOT NULL UNIQUE, "+
								 "cpf CHAR(11) NOT NULL UNIQUE)",
    "down": "DROP TABLE students"
}