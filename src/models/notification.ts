// models/notification.ts
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

// Enum for notification types
export enum NotificationType {
    TRANSACTION = 'TRANSACTION',
    SECURITY = 'SECURITY',
    ACCOUNT = 'ACCOUNT',
    PROMOTION = 'PROMOTION',
    OTHER = 'OTHER'
}

export class Notification extends Model<InferAttributes<Notification>, InferCreationAttributes<Notification>> {
    declare id: CreationOptional<number>;
    declare message: string;
    declare timestamp: Date;
    declare readStatus: boolean;
    declare type: NotificationType;

    // Foreign key
    declare accountHolderId: ForeignKey<AccountHolder['id']>;

    // Association mixins
    declare getAccountHolder: BelongsToGetAssociationMixin<AccountHolder>;
}

export function createNotificationModel(sequelize: Sequelize): typeof Notification {
    Notification.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        readStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        type: {
            type: DataTypes.ENUM(...Object.values(NotificationType)),
            allowNull: false,
            defaultValue: NotificationType.OTHER,
        }
    }, {
        tableName: 'notifications',
        sequelize,
        timestamps: false, // We're managing timestamp manually
        indexes: [
            {
                fields: ['accountHolderId', 'readStatus', 'timestamp'],
            }
        ]
    });

    return Notification;
}
