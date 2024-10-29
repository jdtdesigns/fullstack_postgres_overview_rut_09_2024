import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import client from '../config/connection.js';
const { hash, compare } = bcrypt;
class User extends Model {
    async validatePassword(formPassword) {
        console.log(this.password, formPassword);
        const is_valid = await compare(formPassword, this.password);
        return is_valid;
    }
    toJSON() {
        const user = Object.assign({}, this.get());
        delete user.password;
        return user;
    }
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
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
    tableName: 'users',
    underscored: true,
    hooks: {
        async beforeCreate(userRow) {
            userRow.password = await hash(userRow.password, 10);
            return userRow;
        },
        async beforeBulkCreate(users) {
            for (const user of users) {
                user.password = await hash(user.password, 10);
            }
        }
    },
});
export default User;
