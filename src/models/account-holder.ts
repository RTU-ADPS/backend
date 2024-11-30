import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    Sequelize,
    HasManyGetAssociationsMixin,
    Association
} from 'sequelize';
import { Address } from './address';
import { Account } from './account';
import { Notification } from './notification';
import { Beneficiary } from './beneficiary';

export class AccountHolder extends Model<InferAttributes<AccountHolder>, InferCreationAttributes<AccountHolder>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare phoneNumber: string;
    declare emailAddress: string;

    // Mixins for associations
    declare getAddresses: HasManyGetAssociationsMixin<Address>;
    declare getAccounts: HasManyGetAssociationsMixin<Account>;
    declare getNotifications: HasManyGetAssociationsMixin<Notification>;
    declare getBeneficiaries: HasManyGetAssociationsMixin<Beneficiary>;

    // Static associations
    declare static associations: {
        addresses: Association<AccountHolder, Address>;
        accounts: Association<AccountHolder, Account>;
        notifications: Association<AccountHolder, Notification>;
        beneficiaries: Association<AccountHolder, Beneficiary>;
    };
}

export function createAccountHolderModel(sequelize: Sequelize): typeof AccountHolder {
    AccountHolder.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        phoneNumber: {
            type: new DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        emailAddress: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        }
    }, {
        tableName: 'account_holders',
        sequelize,
        timestamps: true,
    });

    return AccountHolder;
}
