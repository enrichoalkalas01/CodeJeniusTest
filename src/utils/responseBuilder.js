class ResponseBuilder {
    successHandler = ({ res, status, message, data }) => {
        let DataPassing = {
            status: true,
            statusCode: status || 200,
            message: message || "Success to run the process!"
        }

        if ( data ) {
            DataPassing["data"] = data
        }

        res.status(DataPassing.statusCode).json(DataPassing)
    }
}

module.exports = new ResponseBuilder()


