function createError(message, statusCode = 500){
    const err = new Error(message);
    err.statusCode = statusCode;
    console.error(message);
    return err;
}

module.exports = {
    createError
};