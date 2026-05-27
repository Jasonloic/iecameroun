"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Newsletter = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Newsletter extends sequelize_1.Model {
}
exports.Newsletter = Newsletter;
Newsletter.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: sequelize_1.DataTypes.STRING(255), allowNull: false, unique: true },
    estActif: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    token: { type: sequelize_1.DataTypes.STRING(255), allowNull: false, unique: true },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, { sequelize: database_1.sequelize, tableName: 'newsletter_abonnes' });
//# sourceMappingURL=Newsletter.js.map