import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';

interface ShopAttributes {
  name: string;
  address: string;
}

class Shop extends Model<ShopAttributes> implements ShopAttributes {
  public name!: string;
  public address!: string;
}

Shop.init(
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize: client
  }
);

export default Shop;