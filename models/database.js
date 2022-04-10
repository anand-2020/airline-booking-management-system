import { createConnection } from "mysql2";
import {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} from "../utils/config.js";
import { SCHEMA } from "./schema.js";
import { DATA } from "./data.js";
import { STORED_OBJECTS } from "./stored_objects.js";
import { separateSqlCommands } from "./parser.js";

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

db.connect();

const sqlSchema = separateSqlCommands(SCHEMA);
sqlSchema.forEach(async (query) => await db.executeQuery(query));

const sqlData = separateSqlCommands(DATA);
sqlData.forEach(async (query) => await db.executeQuery(query));

const sqlStoredObjects = separateSqlCommands(STORED_OBJECTS);
sqlStoredObjects.forEach(async (query) => await db.executeQuery(query));

db.executeQuery(
  "CALL SHOW_FLIGHTS('af', 'MIAMI', 'USA', 'DUBAI', 'UAE', '2022-04-09')"
)
  .then((res) => console.log(res.data[0]))
  .catch((err) => console.log(err));

export default db;
