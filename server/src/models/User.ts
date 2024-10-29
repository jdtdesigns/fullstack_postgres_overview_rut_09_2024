import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

const {hash, compare} = bcrypt;

export default function User(client: Sequelize) {
  interface UserAttributes {
    first_name: string;
    last_name: string;
    email: string;
    age: number;
    password: string;
  }

  class User extends Model<UserAttributes> implements UserAttributes {
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public password!: string;
    public age!: number;
    async validatePassword(formPassword: string) {
      const is_valid = await compare(formPassword, this.password);

      return is_valid;
    }
  }

  User.init(
    {
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
        async beforeCreate(userRow: any) {
          userRow.password = await hash(userRow.password, 10);
          return userRow;
        }
      },
      // modelName: 'user',
      // tableName: 'users',
      // freezeTableName: true
      // underscored: true
    }
  );

  return User
}