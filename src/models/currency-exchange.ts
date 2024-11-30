import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export class CurrencyExchange extends Model<InferAttributes<CurrencyExchange>, InferCreationAttributes<CurrencyExchange>> {
    declare id: number;
    declare exchange_rate: number;
    declare fee: number;
}

export function createCurrencyExchangeModel(sequelize: Sequelize): typeof CurrencyExchange {
    CurrencyExchange.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            exchange_rate: {
                type: DataTypes.DECIMAL(18, 8), // Supports precise exchange rates
                allowNull: false,
            },
            fee: {
                type: DataTypes.DECIMAL(10, 2), // Supports transaction fees with two-decimal precision
                allowNull: false,
            },
        },
        {
            tableName: 'currency_exchanges',
            sequelize,
        }
    );

    return CurrencyExchange;
}
