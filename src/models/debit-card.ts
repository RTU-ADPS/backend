import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export class DebitCard extends Model<InferAttributes<DebitCard>, InferCreationAttributes<DebitCard>> {
    declare id: number;
    declare provider: string;
    declare card_number: string;
    declare expiration_date: Date;
    declare security_number: number;
    declare PIN: number;
    declare paymentOptionId: number;
}

export function createDebitCardModel(sequelize: Sequelize): typeof DebitCard {
    DebitCard.init(
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
            card_number: {
                type: DataTypes.STRING(16), // Assuming 16-digit card numbers
                allowNull: false,
                unique: true,
            },
            expiration_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            security_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            PIN: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
            tableName: 'debit_cards',
            sequelize,
        }
    );

    return DebitCard;
}
