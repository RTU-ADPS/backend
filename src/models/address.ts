import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    Sequelize,
    HasOneGetAssociationMixin,
    Association
} from 'sequelize';
import { AccountHolder } from './account-holder';

export class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
    declare id: CreationOptional<number>;
    declare country: string;
    declare postalCode: string;
    declare city: string;
    declare streetWithNumber: string;
    declare isPrimary: CreationOptional<boolean>;

    // Mixins for associations
    declare getAccountHolder: HasOneGetAssociationMixin<AccountHolder>;

    // Static associations
    declare static associations: {
        accountHolder: Association<Address, AccountHolder>;
    };
}

export function createAddressModel(sequelize: Sequelize): typeof Address {
    Address.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        country: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        postalCode: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
        city: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        streetWithNumber: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        isPrimary: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        tableName: 'addresses',
        sequelize,
        timestamps: true,
    });

    return Address;
}
