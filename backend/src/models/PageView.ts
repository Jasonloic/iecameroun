import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';
import { Visitor } from './Visitor';

export class PageView extends Model<
InferAttributes<PageView>,
InferCreationAttributes<PageView>
> {
    declare id: CreationOptional<number>;
declare visitorId: number;
declare path: string;
declare referrer: CreationOptional<string | null>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

PageView.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        visitorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        path: { type: DataTypes.STRING(500), allowNull: false },
        referrer: { type: DataTypes.STRING(500), allowNull: true },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'page_views' }
);

Visitor.hasMany(PageView, { foreignKey: 'visitorId', as: 'pageViews' });
PageView.belongsTo(Visitor, { foreignKey: 'visitorId', as: 'visitor' });