import {Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, Sequelize} from 'sequelize';

// order of InferAttributes & InferCreationAttributes is important.
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    // 'CreationOptional' is a special type that marks the field as optional
    // when creating an instance of the model (such as using Model.create()).
    declare id: CreationOptional<number>;
    declare username: string;
    declare password_hash: string;
    declare last_login: string;
    declare two_factor_enabled: boolean;
}

export function createUserModel(sequelize: Sequelize): typeof User {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password_hash: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        last_login: {
            type: DataTypes.TIME(),
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        two_factor_enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        tableName: 'users',
        sequelize,
    });

    return User;
}
