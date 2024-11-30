import {Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes} from 'sequelize';

export class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
    declare id: number;
    declare receiver: string;
    declare amount: number;
    declare currency: string;
    declare time: Date;
    declare accountId: number; // Foreign key to Account
    declare transactionCategoryId: number; // Foreign key to TransactionCategory
    declare currencyExchangeId: number | null; // Foreign key to CurrencyExchange (optional)
}

export function createTransactionModel(sequelize: Sequelize): typeof Transaction {
    Transaction.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            receiver: {
                type: new DataTypes.STRING(128),
                allowNull: false,
            },
            amount: {
                type: DataTypes.DECIMAL(15, 2),
                allowNull: false,
            },
            currency: {
                type: new DataTypes.STRING(3),
                allowNull: false,
            },
            time: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            accountId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'accounts', // Assumes a table named 'accounts'
                    key: 'id',
                },
            },
            transactionCategoryId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'transaction_categories', // Assumes a table named 'transaction_categories'
                    key: 'id',
                },
            },
            currencyExchangeId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'currency_exchanges', // Assumes a table named 'currency_exchanges'
                    key: 'id',
                },
            },
        },
        {
            tableName: 'transactions',
            sequelize,
        }
    );

    return Transaction;
}
