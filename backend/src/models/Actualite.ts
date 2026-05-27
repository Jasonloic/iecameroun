import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export class Actualite extends Model<
InferAttributes<Actualite>,
InferCreationAttributes<Actualite>
> {
    declare id: CreationOptional<number>;
declare titre: string;
declare contenu: string;
declare resume: string;
declare imageCover: CreationOptional<string | null>;
declare categorie: string;
declare estPublie: CreationOptional<boolean>;
declare vues: CreationOptional<number>;
declare auteur: string;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Actualite.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        titre: { type: DataTypes.STRING(255), allowNull: false },
        contenu: { type: DataTypes.TEXT('long'), allowNull: false },
        resume: { type: DataTypes.STRING(500), allowNull: false },
        imageCover: { type: DataTypes.STRING(500), allowNull: true, defaultValue: null },
        categorie: { type: DataTypes.STRING(100), allowNull: false },
        estPublie: { type: DataTypes.BOOLEAN, defaultValue: false },
        vues: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
        auteur: { type: DataTypes.STRING(150), allowNull: false },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'actualites' }
);