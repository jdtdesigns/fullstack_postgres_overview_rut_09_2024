import { DataTypes, Model, Sequelize } from 'sequelize';

export default function Shop(client: Sequelize) {
  class Shop extends Model {}

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
  )

  return Shop;
}