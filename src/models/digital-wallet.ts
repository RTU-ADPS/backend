import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export class DigitalWallet extends Model<InferAttributes<DigitalWallet>, InferCreationAttributes<DigitalWallet>> {
    declare id: number;
    declare provider: string;
    declare walletId: string;
    declare paymentOptionId: number; // Foreign key to PaymentOption
}

export function createDigitalWalletModel(sequelize: Sequelize): typeof DigitalWallet {
    DigitalWallet.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            provider: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            walletId: {
                type: DataTypes.STRING(128),
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
            tableName: 'digital_wallets',
            sequelize,
            timestamps: false, // Disables `createdAt` and `updatedAt`
        }
    );

    return DigitalWallet;
}
