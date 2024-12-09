import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";

export enum PaymentOptionType {
    Account = 0,
    DebitCard = 1,
}

export class PaymentOption
    extends Model<InferAttributes<PaymentOption>, InferCreationAttributes<PaymentOption>> {
    declare id: CreationOptional<number>
    declare type: PaymentOptionType
}

export function createPaymentOptionModel(sequelize: Sequelize): typeof PaymentOption {
    PaymentOption.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'payment_options',
        sequelize,
    });

    return PaymentOption;
}
