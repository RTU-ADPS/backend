import {Account} from "./account";
import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";

export class Transaction
    extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
    declare id: CreationOptional<number>;
    declare receiver: Account;
    declare amount: number;
    declare currency: string;
    declare time: Date;
}

export function createTransactionModel(sequelize: Sequelize): typeof Transaction {
    Transaction.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        receiver: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        currency: {
            type: new DataTypes.STRING(3),
            allowNull: false,
        },
        time: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        tableName: 'transactions',
        sequelize,
    });

    return Transaction;
}
