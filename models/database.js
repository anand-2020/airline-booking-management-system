import { createConnection } from "mysql2";
import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from "../utils/config.js";

class Database {
  constructor() {
    this.db = createConnection({
      host: "localhost",
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    });
  }

  connect = () => {
    this.db.connect((err) => {
      if (err) {
        console.error("Error connecting to db!");
        throw err;
      }
      console.log("Connected!");
    });
  };

  executeQuery = (sqlQuery, params) => {
    var that = this;
    return new Promise((resolve, reject) => {
      that.db
        .promise()
        .query(sqlQuery, params)
        .then((res) => {
          resolve({ data: res[0] });
        })
        .catch((error) => {
          reject({ error: error.message });
        });
    });
  };
}

const db = new Database();

export default db;
