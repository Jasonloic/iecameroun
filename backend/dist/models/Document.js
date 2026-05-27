"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Document extends sequelize_1.Model {
}
exports.Document = Document;
Document.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    titre: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true, defaultValue: null },
    type: {
        type: sequelize_1.DataTypes.ENUM('rapport', 'note', 'autre'),
        allowNull: false,
        defaultValue: 'autre',
    },
    cheminFichier: { type: sequelize_1.DataTypes.STRING(500), allowNull: false },
    nomFichierOriginal: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    tailleFichier: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    mimeType: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    estPublic: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true },
    telechargements: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, { sequelize: database_1.sequelize, tableName: 'documents' });
//# sourceMappingURL=Document.js.map