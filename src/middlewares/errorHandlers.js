class ErrorHandlers {
    errorHandler = (err, req, res, next) => {
        console.log(err.status)
        let DataPassing = {
            status: false,
            statusCode: err.status || 500,
            message: err.message || "Internal Server Errors!",
        }

        if ( err.errors ) {
            DataPassing["errors"] = err.errors
        }

        return res.status(DataPassing.statusCode).json(DataPassing)
    }
}

module.exports = new ErrorHandlers()


