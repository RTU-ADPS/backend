import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";

export enum CardProvider {
    MasterCard = 0,
    VISA = 1,
}

export class DebitCard
    extends Model<InferAttributes<DebitCard>, InferCreationAttributes<DebitCard>> {
    declare id: CreationOptional<number>;
    declare provider: CardProvider;
    declare cardNumber: bigint;
    declare expirationDate: Date;
    declare securityNumber: number;
    declare pin: number;
}

export function createDebitCardModel(sequelize: Sequelize): typeof DebitCard {
    DebitCard.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        provider: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cardNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        securityNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pin: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'debit_cards',
        sequelize,
    });

    return DebitCard;
}
