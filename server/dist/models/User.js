import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import client from '../config/connection.js';
import Shop from './Shop.js';
import Wine from './Wine.js';
const { hash, compare } = bcrypt;
class User extends Model {
    async validatePassword(formPassword) {
        const is_valid = await compare(formPassword, this.password);
        return is_valid;
    }
}
await User.init({
    // the id column/field is defined for you
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, Infinity] // Ensure they type at least 6 characters for the password
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 21
        }
    }
}, 
// Options object
// When defining your model with the class syntax, you must provide the client connection through the 'sequelize' property
{
    sequelize: client,
    hooks: {
        async beforeCreate(userRow) {
            userRow.password = await hash(userRow.password, 10);
            return userRow;
        }
    },
    // modelName: 'user',
    // tableName: 'users',
    // freezeTableName: true
    // underscored: true
});
// Declare Associations
// One To Many Relationships
User.hasMany(Shop);
Shop.belongsTo(User);
Shop.hasMany(Wine);
Wine.belongsTo(Shop);
User.hasMany(Wine);
Wine.belongsTo(User);
// Create the manager association
User.hasOne(User, { foreignKey: 'managerId', as: 'manager' });
User.belongsTo(User, { foreignKey: 'managerId', as: 'employee' });
export default User;
