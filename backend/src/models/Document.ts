import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export type DocumentType = 'rapport' | 'note' | 'autre';

export class Document extends Model<
InferAttributes<Document>,
InferCreationAttributes<Document>
> {
    declare id: CreationOptional<number>;
declare titre: string;
declare description: CreationOptional<string | null>;
declare type: DocumentType;
declare cheminFichier: string;
declare nomFichierOriginal: string;
declare tailleFichier: number;
declare mimeType: string;
declare estPublic: CreationOptional<boolean>;
declare telechargements: CreationOptional<number>;
declare createdAt: CreationOptional<Date>;
declare updatedAt: CreationOptional<Date>;
}

Document.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        titre: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
        type: {
            type: DataTypes.ENUM('rapport', 'note', 'autre'),
            allowNull: false,
            defaultValue: 'autre',
        },
        cheminFichier: { type: DataTypes.STRING(500), allowNull: false },
        nomFichierOriginal: { type: DataTypes.STRING(255), allowNull: false },
        tailleFichier: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        mimeType: { type: DataTypes.STRING(100), allowNull: false },
        estPublic: { type: DataTypes.BOOLEAN, defaultValue: true },
        telechargements: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize, tableName: 'documents' }
);