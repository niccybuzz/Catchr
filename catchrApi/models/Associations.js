const User = require('./User');
const Collection = require('./Collection');
const Set = require("./Set")
const Series = require("./Series")
const Card = require("./Card")
const Category = require("./Category")
const Rarity = require("./Rarity")
const Illustrator = require("./Illustrator")
const Fineprint = require("./Fineprint")
const Type = require("./Type")
const Ability = require("./Ability")
const CardCollection = require("./many-to-many-files/CardCollection")

User.hasOne(Collection, { foreignKey: 'user_id' });
Collection.belongsTo(User, { foreignKey: 'user_id' });

Collection.belongsToMany(Card, {through: CardCollection})
Card.belongsToMany(Collection, {through: CardCollection})

Card.belongsTo(Set, {foreignKey : 'set_id'});
Set.hasMany(Card, {foreignKey : 'set_id'});

Card.belongsTo(Rarity);
Rarity.hasMany(Card);

Card.belongsTo(Illustrator);
Illustrator.hasMany(Card);

Card.belongsTo(Fineprint);
Fineprint.hasMany(Card);

Card.belongsTo(Category);
Category.hasMany(Card);

Card.belongsTo(Type,{foreignKey : 'type_id'});
Type.hasMany(Card,{foreignKey : 'type_id'})

Set.belongsTo(Series, {foreignKey : 'series_id'});
Series.hasMany(Set, {foreignKey : 'series_id'});

Card.hasMany(Ability, { foreignKey: 'card_id' });
Ability.belongsTo(Card, { foreignKey: 'card_id' });

Ability.belongsTo(Type, { as: 'primary_type', foreignKey: 'primary_type_id' });
Ability.belongsTo(Type, { as: 'secondary_type', foreignKey: 'secondary_type_id' });

Card.belongsTo(Type, {as: 'weakness_type', foreignKey: 'weakness_type_id'})
Card.belongsTo(Type, {as: 'resistance_type', foreignKey: 'resistance_type_id'})
Card.belongsTo(Type, {as: 'retreat_type', foreignKey: 'retreat_type_id'})


module.exports = { User, Collection, Set, Type, Category, Ability, Rarity };
