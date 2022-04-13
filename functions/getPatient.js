"use strict";

const handlerError = require("../utils/handlerError");
const { paramsTable, dynamoDb } = require("../db/config");

module.exports.handler = async (event) => {
  try {
    const { patientId } = event.pathParameters;
    const data = await dynamoDb
      .get({
        ...paramsTable,
        Key: {
          id: patientId,
        },
      })
      .promise();

    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify(
          {
            error: "Patient is not exists",
          },
          null,
          2
        ),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data.Item, null, 2),
    };
  } catch (error) {
    const err = handlerError(error);

    return {
      body: JSON.stringify(err),
    };
  }
};
