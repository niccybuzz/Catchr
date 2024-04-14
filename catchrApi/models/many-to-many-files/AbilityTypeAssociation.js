
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

//middle table for many to many relationship between ability and cost
const AbilityTypeAssociation = sequelize.define('AbilityTypeAssociation', {
    
});

module.exports = AbilityTypeAssociation;
