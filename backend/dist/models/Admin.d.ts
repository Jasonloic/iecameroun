import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
export declare class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>> {
    id: CreationOptional<number>;
    nom: string;
    email: string;
    motDePasse: string;
    role: CreationOptional<'admin' | 'editeur'>;
    estActif: CreationOptional<boolean>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
    verifierMotDePasse(candidat: string): Promise<boolean>;
}
//# sourceMappingURL=Admin.d.ts.map