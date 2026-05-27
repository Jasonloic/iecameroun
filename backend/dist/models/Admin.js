"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
class Admin extends sequelize_1.Model {
    async verifierMotDePasse(candidat) {
        return bcryptjs_1.default.compare(candidat, this.motDePasse);
    }
}
exports.Admin = Admin;
Admin.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    nom: { type: sequelize_1.DataTypes.STRING(150), allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING(255), allowNull: false, unique: true },
    motDePasse: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    role: { type: sequelize_1.DataTypes.ENUM('admin', 'editeur'), defaultValue: 'editeur' },
    estActif: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, { sequelize: database_1.sequelize, tableName: 'admins' });
Admin.beforeCreate(async (admin) => {
    admin.motDePasse = await bcryptjs_1.default.hash(admin.motDePasse, 12);
});
Admin.beforeUpdate(async (admin) => {
    if (admin.changed('motDePasse')) {
        admin.motDePasse = await bcryptjs_1.default.hash(admin.motDePasse, 12);
    }
});
//# sourceMappingURL=Admin.js.map