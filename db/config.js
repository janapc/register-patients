const AWS = require("aws-sdk");

const paramsTable = {
  TableName: process.env.PATIENTS_TABLE,
};

const dynamoDb = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
    })
  : new AWS.DynamoDB.DocumentClient();

module.exports = { paramsTable, dynamoDb };
