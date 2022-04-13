"use strict";

const handlerError = require("../utils/handlerError");
const { paramsTable, dynamoDb } = require("../db/config");

module.exports.handler = async (event) => {
  try {
    const queryString = {
      limit: 5,
      ...event.queryStringParameters,
    };

    const { limit, next } = queryString;

    let localParams = {
      ...paramsTable,
      Limit: limit,
    };

    if (next) {
      localParams.ExclusiveStartKey = {
        id: next,
      };
    }

    let data = await dynamoDb.scan(localParams).promise();

    let nextToken =
      data.LastEvaluatedKey !== undefined ? data.LastEvaluatedKey.id : null;

    const result = {
      items: data.Items,
      next_token: nextToken,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    const err = handlerError(error);

    return {
      body: JSON.stringify(err),
    };
  }
};
