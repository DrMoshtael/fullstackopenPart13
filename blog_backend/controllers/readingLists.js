const router = require('express').Router()
const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
    const list_item = await ReadingList.create(req.body)
    res.json(list_item)
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const list_item = await ReadingList.findByPk(req.params.id)
    if (list_item.userId !== req.decodedToken.id) {
        res.status(401).json('Unauthorized')
    }
    list_item.blogRead = req.body.blogRead
    await list_item.save()
    res.json(list_item)
})

module.exports = router