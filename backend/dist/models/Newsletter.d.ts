import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
export declare class Newsletter extends Model<InferAttributes<Newsletter>, InferCreationAttributes<Newsletter>> {
    id: CreationOptional<number>;
    email: string;
    estActif: CreationOptional<boolean>;
    token: string;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
//# sourceMappingURL=Newsletter.d.ts.map