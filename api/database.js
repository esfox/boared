const Sequelize = require('sequelize');
const { Model, DataTypes } = Sequelize;

const sequelize = new Sequelize(
{
  storage: './api/data.sqlite',
  dialect: 'sqlite',
});

class Post extends Model {}
Post.init(
{
  content: DataTypes.TEXT,
}, { sequelize, underscored: true });

sequelize.sync();

exports.getPosts = () => Post.findAll();
exports.savePost = content => Post.create({ content });
