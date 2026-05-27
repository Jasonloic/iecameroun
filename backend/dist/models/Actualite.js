"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actualite = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Actualite extends sequelize_1.Model {
}
exports.Actualite = Actualite;
Actualite.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    titre: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    contenu: { type: sequelize_1.DataTypes.TEXT('long'), allowNull: false },
    resume: { type: sequelize_1.DataTypes.STRING(500), allowNull: false },
    imageCover: { type: sequelize_1.DataTypes.STRING(500), allowNull: true, defaultValue: null },
    categorie: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    estPublie: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    vues: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    auteur: { type: sequelize_1.DataTypes.STRING(150), allowNull: false },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, { sequelize: database_1.sequelize, tableName: 'actualites' });
//# sourceMappingURL=Actualite.js.map