const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'listed_blogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_listed' })

module.exports = {
  Blog, User, ReadingList
}