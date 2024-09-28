const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
    const data = await Blog.findAll({
        group: 'author',
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('author')), 'articles'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'total likes']
        ],
        order: [['total likes', 'DESC']]
    })
    res.json(data)
})

module.exports = router