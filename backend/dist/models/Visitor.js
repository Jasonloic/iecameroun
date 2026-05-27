"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visitor = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Visitor extends sequelize_1.Model {
}
exports.Visitor = Visitor;
Visitor.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    ipAddress: { type: sequelize_1.DataTypes.STRING(45), allowNull: false },
    userAgent: { type: sequelize_1.DataTypes.STRING(500), allowNull: true },
    pays: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    ville: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    region: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    fingerprint: { type: sequelize_1.DataTypes.STRING(64), allowNull: true },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, { sequelize: database_1.sequelize, tableName: 'visitors' });
//# sourceMappingURL=Visitor.js.map