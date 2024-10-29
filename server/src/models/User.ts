import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import client from '../config/connection.js';

const {hash, compare} = bcrypt;

interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  age: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public age!: number;

  public async validatePassword(formPassword: string): Promise<boolean> {
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

User.init(
  {
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
      async beforeCreate(userRow: any) {
        userRow.password = await hash(userRow.password, 10);
        return userRow;
      },

      async beforeBulkCreate(users: any[]) {
        for (const user of users) {
          user.password = await hash(user.password, 10);
        }
      }
    },
  }
);

export default User;