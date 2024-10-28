import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';
class Shop extends Model {
}
Shop.init({
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: client
});
export default Shop;
