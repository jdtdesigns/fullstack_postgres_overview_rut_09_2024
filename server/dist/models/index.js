import client from '../config/connection.js';
import User from './User.js';
import Shop from './Shop.js';
import Wine from './Wine.js';
const UserModel = User(client);
const ShopModel = Shop(client);
const WineModel = Wine(client);
// // One To Many Relationships
UserModel.hasMany(ShopModel);
ShopModel.belongsTo(UserModel);
ShopModel.hasMany(WineModel);
WineModel.belongsTo(ShopModel);
UserModel.hasMany(WineModel);
WineModel.belongsTo(UserModel);
// Create the manager association
UserModel.hasOne(UserModel, { foreignKey: 'managerId', as: 'manager' });
UserModel.belongsTo(UserModel, { foreignKey: 'managerId', as: 'employee' });
export default client;
// // Declare Associations
// // One To Many Relationships
// User.hasMany(ShopModel);
// ShopModel.belongsTo(User);
// Shop.hasMany(Wine);
// Wine.belongsTo(Shop);
// User.hasMany(Wine);
// Wine.belongsTo(User);
// // Create the manager association
// User.hasOne(User, { foreignKey: 'managerId', as: 'manager' });
// User.belongsTo(User, { foreignKey: 'managerId', as: 'employee' });
