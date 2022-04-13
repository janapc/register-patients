"use strict";

const { v4: uuidv4 } = require("uuid");

const handlerError = require("../utils/handlerError");
const { paramsTable, dynamoDb } = require("../db/config");

module.exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const { namePatient, email, phone, birth_date } = data;

    const patient = {
      id: uuidv4(),
      namePatient,
      email,
      phone,
      birth_date,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      status: true,
    };

    await dynamoDb.put({ ...paramsTable, Item: patient }).promise();

    return {
      statusCode: 201,
    };
  } catch (error) {
    const err = handlerError(error);

    return {
      body: JSON.stringify(err),
    };
  }
};
