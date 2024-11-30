import {
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DataTypes,
    Sequelize,
    ForeignKey,
    BelongsToGetAssociationMixin
} from 'sequelize';
import { AccountHolder } from './account-holder';

export class Beneficiary extends Model<InferAttributes<Beneficiary>, InferCreationAttributes<Beneficiary>> {
    declare id: CreationOptional<number>;
    declare nickname: string;
    declare relationship: string;

    // Foreign key
    declare accountHolderId: ForeignKey<AccountHolder['id']>;

    // Association mixins
    declare getAccountHolder: BelongsToGetAssociationMixin<AccountHolder>;
}

export function createBeneficiaryModel(sequelize: Sequelize): typeof Beneficiary {
    Beneficiary.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nickname: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        relationship: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        }
    }, {
        tableName: 'beneficiaries',
        sequelize,
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['accountHolderId', 'nickname']
            }
        ]
    });

    return Beneficiary;
}
