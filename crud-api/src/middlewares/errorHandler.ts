import logginMiddleware from "./logging";

function errorHandler(err, req, res) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Ocurrió un error interno del servidor';

    logginMiddleware.logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,);

    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: message
    })
}

export default errorHandler;