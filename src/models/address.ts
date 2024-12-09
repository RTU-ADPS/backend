import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";

export class Address
    extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
    declare id: CreationOptional<number>;
    declare country: string;
    declare postalCode: string;
    declare city: string;
    declare streetWithNumber: string;
}

export function createAddressModel(sequelize: Sequelize): typeof Address {
    Address.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        country: {
            type: new DataTypes.STRING(4),
            allowNull: false,
        },
        postalCode: {
            type: new DataTypes.STRING(20),
            allowNull: false
        },
        city: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        streetWithNumber: {
            type: new DataTypes.STRING(128),
            allowNull: false
        }
    }, {
        tableName: 'addresses',
        sequelize,
    });

    return Address;
}

