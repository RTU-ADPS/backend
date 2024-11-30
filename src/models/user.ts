import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    Sequelize,
    HasOneGetAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    Association
} from 'sequelize';
import { AccountHolder } from './account-holder';
import { SecurityLog } from './security-log';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare passwordHash: string;
    declare lastLogin: Date;
    declare twoFactorEnabled: boolean;

    // Mixins for associations
    declare getAccountHolder: HasOneGetAssociationMixin<AccountHolder>;
    declare getSecurityLogs: HasManyGetAssociationsMixin<SecurityLog>;

    // Static associations
    declare static associations: {
        accountHolder: Association<User, AccountHolder>;
        securityLogs: Association<User, SecurityLog>;
    };
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
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING(256),
            allowNull: false,
        },
        lastLogin: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: DataTypes.NOW(),
        },
        twoFactorEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        tableName: 'users',
        sequelize,
    });

    return User;
}
