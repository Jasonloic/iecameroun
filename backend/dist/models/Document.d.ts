import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
export type DocumentType = 'rapport' | 'note' | 'autre';
export declare class Document extends Model<InferAttributes<Document>, InferCreationAttributes<Document>> {
    id: CreationOptional<number>;
    titre: string;
    description: CreationOptional<string | null>;
    type: DocumentType;
    cheminFichier: string;
    nomFichierOriginal: string;
    tailleFichier: number;
    mimeType: string;
    estPublic: CreationOptional<boolean>;
    telechargements: CreationOptional<number>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
//# sourceMappingURL=Document.d.ts.map