const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message,
        },
    })
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}

module.exports = { errorHandler, unknownEndpoint }