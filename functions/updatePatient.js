"use strict";

const handlerError = require("../utils/handlerError");
const { paramsTable, dynamoDb } = require("../db/config");

module.exports.handler = async (event) => {
  const { patientId } = event.pathParameters;

  try {
    const data = JSON.parse(event.body);
    const { namePatient, email, phone, birth_date } = data;

    await dynamoDb
      .update({
        ...paramsTable,
        Key: {
          id: patientId,
        },
        UpdateExpression:
          "SET namePatient = :namePatient, birth_date = :bd, email = :email, phone = :phone, updated_at = :updated_at",
        ConditionExpression: "attribute_exists(id)",
        ExpressionAttributeValues: {
          ":namePatient": namePatient,
          ":bd": birth_date,
          ":email": email,
          ":phone": phone,
          ":updated_at": new Date().getTime(),
        },
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
