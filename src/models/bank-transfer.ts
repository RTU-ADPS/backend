import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export class BankTransfer extends Model<InferAttributes<BankTransfer>, InferCreationAttributes<BankTransfer>> {
    declare id: number;
    declare bankName: string;
    declare accountNumber: string;
    declare paymentOptionId: number;
}

export function createBankTransferModel(sequelize: Sequelize): typeof BankTransfer {
    BankTransfer.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            bankName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            accountNumber: {
                type: DataTypes.STRING(34), // Supports IBAN or other long account numbers
                allowNull: false,
                unique: true,
            },
            paymentOptionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'payment_options',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
        },
        {
            tableName: 'bank_transfers',
            sequelize,
        }
    );

    return BankTransfer;
}
