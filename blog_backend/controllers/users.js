router = require('express').Router()
const { User, Blog } = require('../models')
const { Op } = require('sequelize')

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
    let status = {
        [Op.in]: [true, false]
    }
    if (req.query.read) {
        status = req.query.read
    }
    const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        include: [
        {
            model: Blog,
            as: 'listed_blogs',
            through: {
                attributes: ['blogRead', 'id'],
                where: {
                    blogRead: status
                }
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

    if (!user) return res.status(404).json({ error: 'user not found' })

    user.username = req.body.username
    user.save()
    res.json(user)
})

module.exports = router