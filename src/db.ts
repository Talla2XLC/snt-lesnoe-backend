import mysql from 'mysql';

export default class DB {
  connection;
  // connection = mysql.createConnection({
  //   host     : 'mysql.hosting.nic.ru',
  //   port: 3306,
  //   user     : 'snt2570560_mysql',
  //   password : 'ms5:oHTA',
  //   database : 'snt2570560_db',
  //   charset : 'UTF8'
  // });

  constructor() {
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection = mysql.createConnection({
        host     : 'mysql.hosting.nic.ru',
        port: 3306,
        user     : 'snt2570560_mysql',
        password : 'ms5:oHTA',
        database : 'snt2570560_db',
        charset : 'UTF8_GENERAL_CI'
      });

      this.connection.connect(err => {
        if (err) {
          reject(err.stack);
        }

        resolve('Соединение с БД установлено. ID: ' + this.connection.threadId)
      });
    })
  }

  getDebtors() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM `debtors`', (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows)
      });
    })
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) {
          reject(err.stack);
        }

        resolve('Соединение с БД разорвано')
      });
    })
  }

  addDebtor() {
    return new Promise((resolve, reject) => {
      const QUERY = "INSERT INTO `debtors`"
        + "(`id_debtor`, `created`, `updated`, `name`, `dabt_amount`, `email`, `phone`)"
        + "VALUES"
        + "(NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Азаза', '123', '123', '123')"
      this.connection.query(QUERY, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows)
      });
    })
  }
}
