const User = require('./User');
const Collection = require('./Collection');
const Set = require("./Set")
const Series = require("./Series")
const Card = require("./Card")
const Category = require("./Category")
const Type = require("./Type")
const Ability = require("./Ability")
const AbilityTypeAssociation = require("./many-to-many-files/AbilityTypeAssociation")


User.hasMany(Collection, { foreignKey: 'user_id' });
Collection.belongsTo(User, { foreignKey: 'user_id' });

Card.belongsTo(Set, {foreignKey : 'set_id'});
Set.hasMany(Card, {foreignKey : 'set_id'});

Card.belongsTo(Category, {foreignKey : 'category_id'});
Category.hasMany(Card, {foreignKey : 'category_id'});

Card.belongsTo(Type,{foreignKey : 'type_id'});
Type.hasMany(Card,{foreignKey : 'type_id'})

Set.belongsTo(Series, {foreignKey : 'series_id'});
Series.hasMany(Set, {foreignKey : 'series_id'});

Ability.belongsToMany(Type, { through: AbilityTypeAssociation });
Type.belongsToMany(Ability, { through: AbilityTypeAssociation });


Card.hasMany(Ability, { foreignKey: 'card_id' });
Ability.belongsTo(Card, { foreignKey: 'card_id' });


module.exports = { User, Collection, Set, Type, Category, Ability };
