import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export class Newsletter extends Model<
InferAttributes<Newsletter>,
InferCreationAttributes<Newsletter>
> {
    declare id: CreationOptional<number>;
declare email: string;
declare estActif: CreationOptional<boolean>;
declare token: string;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Newsletter.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        estActif: { type: DataTypes.BOOLEAN, defaultValue: true },
        token: { type: DataTypes.STRING(255), allowNull: false, unique: true },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'newsletter_abonnes' }
);