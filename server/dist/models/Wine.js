import { DataTypes, Model } from 'sequelize';
export default function Wine(client) {
    class Wine extends Model {
    }
    Wine.init({
        // Model attributes are defined here
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        sequelize: client
    });
    return Wine;
}
