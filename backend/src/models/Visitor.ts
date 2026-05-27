import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export class Visitor extends Model<
InferAttributes<Visitor>,
InferCreationAttributes<Visitor>
> {
    declare id: CreationOptional<number>;
declare ipAddress: string;
declare userAgent: CreationOptional<string | null>;
declare pays: CreationOptional<string | null>;
declare ville: CreationOptional<string | null>;
declare region: CreationOptional<string | null>;
declare fingerprint: CreationOptional<string | null>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Visitor.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        ipAddress: { type: DataTypes.STRING(45), allowNull: false },
        userAgent: { type: DataTypes.STRING(500), allowNull: true },
        pays: { type: DataTypes.STRING(100), allowNull: true },
        ville: { type: DataTypes.STRING(100), allowNull: true },
        region: { type: DataTypes.STRING(100), allowNull: true },
        fingerprint: { type: DataTypes.STRING(64), allowNull: true },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'visitors' }
);