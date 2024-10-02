router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: ['title']
        }
    })
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: [
        {
            model: Blog,
            as: 'listed_blogs',
            through: {
                attributes: []
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'userId']}
        }
    ]
    })
    res.json(user)
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    user.username = req.body.username
    user.save()
    res.json(user)
})

module.exports = router