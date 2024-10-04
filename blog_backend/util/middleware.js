const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session } = require('../models')

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch {
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const sessionChecker = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ error: 'token missing' })
    }
    const session = await Session.findOne({
        where: {
            token: authorization.substring(7)
        }
    })
    console.log('sess',session)
    if (!session) {
        return res.status(401).json({ error: 'token expired'})
    }
    next()
}

module.exports = { tokenExtractor, sessionChecker }