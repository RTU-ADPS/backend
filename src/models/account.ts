import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";

export class Account extends Model<InferAttributes<Account>, InferCreationAttributes<Account>> {
    declare id: CreationOptional<number>;
    declare balance: number;
    declare currency: string;
    declare IBAN: string;
    declare accountType: string;
    declare creationDate: Date;
    declare status: string;
}

export function createAccountModel(sequelize: Sequelize): typeof Account {
    Account.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            balance: {
                type: DataTypes.DECIMAL(15, 2), // Handles large balances and cents precision
                allowNull: false,
                defaultValue: 0.0,
            },
            currency: {
                type: new DataTypes.STRING(3), // ISO 4217 currency code (e.g., USD, EUR)
                allowNull: false,
            },
            IBAN: {
                type: new DataTypes.STRING(34), // IBAN can be up to 34 characters long
                allowNull: false,
                unique: true,
            },
            accountType: {
                type: new DataTypes.STRING(50),
                allowNull: false,
            },
            creationDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            status: {
                type: new DataTypes.STRING(20),
                allowNull: false,
                defaultValue: 'active',
            },
        },
        {
            tableName: 'accounts',
            sequelize,
        }
    );

    return Account;
}
