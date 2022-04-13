function handlerError(error, patientId = "") {
  let err = error.name ? error.name : "Exception";
  let message = error.message ? error.message : "Unknown error";
  let statusCode = error.statusCode ? error.statusCode : 500;

  if (error.name == "ConditionalCheckFailedException") {
    err = "Patient is not exists";
    message = `The patient with the Id ${patientId} not exists and not can be update`;
    statusCode = 404;
  }

  return { error: err, message, statusCode };
}

module.exports = handlerError;
