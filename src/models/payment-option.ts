import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

// Enum to represent the different payment option types
export enum PaymentOptionType {
    BANK_TRANSFER,
    DEBIT_CARD,
    DIGITAL_WALLET,
}

export class PaymentOption extends Model<InferAttributes<PaymentOption>, InferCreationAttributes<PaymentOption>> {
    declare id: number;
}

export function createPaymentOptionModel(sequelize: Sequelize): typeof PaymentOption {
    PaymentOption.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        },
        {
            tableName: 'payment_options',
            sequelize,
        }
    );

    return PaymentOption;
}

/*const PaymentOptions = [
    PaymentOption.create({id: PaymentOptionType.BANK_TRANSFER}),
    PaymentOption.create({id: PaymentOptionType.DEBIT_CARD}),
    PaymentOption.create({id: PaymentOptionType.DIGITAL_WALLET}),
]*/
