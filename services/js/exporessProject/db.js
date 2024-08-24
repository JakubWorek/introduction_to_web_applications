const { Sequelize, DataTypes } = require('sequelize');

var sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    storage: './data/database.sqlite'
});

var PersonSchema = sequelize.define("Person", {
    id: {type: DataTypes.INTEGER, autoIncrement: true,
        primaryKey: true},
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    job: DataTypes.STRING
},{

});

module.exports = {sequelize, PersonSchema};