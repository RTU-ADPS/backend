import { Sequelize, DataTypes, Model } from 'sequelize';

export class TransactionCategory extends Model {
    public id!: number;
    public name!: string;
    public description?: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function createTransactionCategoryModel(sequelize: Sequelize): typeof TransactionCategory {
    TransactionCategory.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new DataTypes.STRING(128),
                allowNull: false,
                unique: true,
            },
            description: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
        },
        {
            tableName: 'transaction_categories',
            sequelize,
        }
    );

    return TransactionCategory;
}
