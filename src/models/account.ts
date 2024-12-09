import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";
import {Address} from "./address";

export class Account
    extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
    declare id: CreationOptional<number>;
    declare balance: number;
    declare currency: string;
    declare iban: string;
}

export function createAccountModel(sequelize: Sequelize): typeof Account {
    Account.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        currency: {
            type: new DataTypes.STRING(3),
            allowNull: false,
        },
        iban: {
            type: new DataTypes.STRING(34),
            allowNull: false,
            unique: true,
        }
    }, {
        tableName: 'accounts',
        sequelize,
    });

    return Account;
}
