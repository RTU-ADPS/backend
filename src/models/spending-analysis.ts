import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export class SpendingAnalysis extends Model<InferAttributes<SpendingAnalysis>, InferCreationAttributes<SpendingAnalysis>> {
    declare id: number;
    declare budget_limit: number;
    declare spending_categories: string[]; // Assuming categories are stored as a string array (JSON)
    declare accountId: number; // Foreign key to Account
}

export function createSpendingAnalysisModel(sequelize: Sequelize): typeof SpendingAnalysis {
    SpendingAnalysis.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            budget_limit: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            spending_categories: {
                type: DataTypes.JSON, // Stores an array of categories in JSON format
                allowNull: false,
            },
            accountId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'accounts', // Assumes a table named 'accounts'
                    key: 'id',
                },
            },
        },
        {
            tableName: 'spending_analysis',
            sequelize,
        }
    );

    return SpendingAnalysis;
}
