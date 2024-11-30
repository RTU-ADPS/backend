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
import { User } from './user';

export class SecurityLog extends Model<InferAttributes<SecurityLog>, InferCreationAttributes<SecurityLog>> {
    declare id: CreationOptional<number>;
    declare timestamp: Date;
    declare action: string;
    declare ipAddress: string;
    declare deviceInfo: string;

    // Foreign key
    declare userId: ForeignKey<User['id']>;

    // Association mixins
    declare getUser: BelongsToGetAssociationMixin<User>;
}

export function createSecurityLogModel(sequelize: Sequelize): typeof SecurityLog {
    SecurityLog.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        action: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        ipAddress: {
            type: new DataTypes.STRING(45), // IPv6 support
            allowNull: false,
        },
        deviceInfo: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    }, {
        tableName: 'security_logs',
        sequelize,
        timestamps: false, // We're managing timestamp manually
        indexes: [
            {
                fields: ['userId', 'timestamp'],
            }
        ]
    });

    return SecurityLog;
}
