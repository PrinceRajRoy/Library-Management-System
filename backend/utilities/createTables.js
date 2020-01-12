const mysql = require('mysql');
const cred = require('./credentials');

class TABLES {
    
    constructor(){
        
        this.db = mysql.createConnection({
            ...cred,
            database: 'library'
        });

        this.sql = {
            student: 'CREATE TABLE IF NOT EXISTS STUDENT(id int AUTO_INCREMENT, name VARCHAR(255), fine float(6,2) DEFAULT 0, PRIMARY KEY (id))',
            books: 'CREATE TABLE IF NOT EXISTS BOOK(id int AUTO_INCREMENT, name VARCHAR(255), author VARCHAR(255), semester int(1), count int, PRIMARY KEY (id))',
            borrow: "CREATE TABLE IF NOT EXISTS BORROW(idStudent int, idBook int, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, deadline TIMESTAMP DEFAULT DATE_ADD(CURRENT_TIMESTAMP(),INTERVAL 7 DAY),\
                     PRIMARY KEY (idStudent, idBook),\
                     FOREIGN KEY(idStudent) REFERENCES STUDENT(id),\
                     FOREIGN KEY(idBook) REFERENCES BOOK(id))"
        };
        
    }

    initTable() {
        for(let i in this.sql){
            this.db.query(this.sql[i], (err, result) => {
                if(err)
                    console.log(`Couldn't create table ${i}`);
                else
                    console.log(`Successfully created table ${i}`);
            })
        }
    }
}

module.exports = TABLES;