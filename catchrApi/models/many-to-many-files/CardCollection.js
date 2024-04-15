const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

//middle table for many to many relationship between ability and cost
const CardCollection = sequelize.define('CardCollection', {
    
});

module.exports = CardCollection;