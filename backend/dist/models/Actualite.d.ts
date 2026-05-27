import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
export declare class Actualite extends Model<InferAttributes<Actualite>, InferCreationAttributes<Actualite>> {
    id: CreationOptional<number>;
    titre: string;
    contenu: string;
    resume: string;
    imageCover: CreationOptional<string | null>;
    categorie: string;
    estPublie: CreationOptional<boolean>;
    vues: CreationOptional<number>;
    auteur: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
//# sourceMappingURL=Actualite.d.ts.map