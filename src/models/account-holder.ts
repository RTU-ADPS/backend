import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";

export class AccountHolder
    extends Model<InferAttributes<AccountHolder>, InferCreationAttributes<AccountHolder>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare phoneNumber: string;
    declare emailAddress: string;
}

export function createAccountHolderModel(sequelize: Sequelize): typeof AccountHolder {
    AccountHolder.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        phoneNumber: {
            type: new DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        emailAddress: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        }
    }, {
        tableName: 'account_holders',
        sequelize,
    });

    return AccountHolder;
}
