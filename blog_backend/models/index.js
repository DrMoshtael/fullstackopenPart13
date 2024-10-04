const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'listed_blogs' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_listed' })

User.hasOne(Session)
Session.belongsTo(User)

module.exports = {
  Blog, User, ReadingList, Session
}