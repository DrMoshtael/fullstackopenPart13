const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
        const error = new Error('Blog not found')
        error.status = 404
        throw error
    }
    req.blog = blog
    next()
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
    res.json(req.blog)
})

router.post('/', async (req, res) => {
    //Required fields title and url are already validated by the model, as are types

    //To make sure no superfluous fields are included we can check the fields of the model
    const allowedFields = Object.keys(Blog.getAttributes())
    //Then check the fields of the request body against them
    const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field))
    if (extraFields.length > 0) {
        const error = new Error(`Superfluous fields included: ${extraFields.join(', ')}`)
        error.status = 400
        throw error
    }

    const blog = await Blog.create(req.body) //express-async-errors will pass errors here to errorHandler
    res.json(blog)
})

router.delete('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        await req.blog.destroy()
    }
    res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
    if (!req.body.likes || typeof(req.body.likes) !== 'number') {
        const error = new Error('Invalid request for likes')
        error.status = 400
        throw error
    } 
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})

module.exports = router