"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageView = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Visitor_1 = require("./Visitor");
class PageView extends sequelize_1.Model {
}
exports.PageView = PageView;
PageView.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    visitorId: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    path: { type: sequelize_1.DataTypes.STRING(500), allowNull: false },
    referrer: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, { sequelize: database_1.sequelize, tableName: 'page_views' });
Visitor_1.Visitor.hasMany(PageView, { foreignKey: 'visitorId', as: 'pageViews' });
PageView.belongsTo(Visitor_1.Visitor, { foreignKey: 'visitorId', as: 'visitor' });
//# sourceMappingURL=PageView.js.map