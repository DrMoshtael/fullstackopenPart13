const router = require('express').Router()
const { Session } = require('../models')

router.delete('/:id', async (req, res) => {
    await Session.destroy({
        where: {
            userId: req.params.id
        }
    })
    res.status(200).end()
})

module.exports = router