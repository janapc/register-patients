"use strict";

const handlerError = require("../utils/handlerError");
const { paramsTable, dynamoDb } = require("../db/config");

module.exports.handler = async (event) => {
  const { patientId } = event.pathParameters;

  try {
    await dynamoDb
      .delete({
        ...paramsTable,
        Key: {
          id: patientId,
        },
        ConditionExpression: "attribute_exists(id)",
      })
      .promise();

    return {
      statusCode: 204,
    };
  } catch (error) {
    const err = handlerError(error);

    return {
      body: JSON.stringify(err),
    };
  }
};
