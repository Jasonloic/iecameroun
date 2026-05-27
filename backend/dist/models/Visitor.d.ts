import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
export declare class Visitor extends Model<InferAttributes<Visitor>, InferCreationAttributes<Visitor>> {
    id: CreationOptional<number>;
    ipAddress: string;
    userAgent: CreationOptional<string | null>;
    pays: CreationOptional<string | null>;
    ville: CreationOptional<string | null>;
    region: CreationOptional<string | null>;
    fingerprint: CreationOptional<string | null>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
//# sourceMappingURL=Visitor.d.ts.map