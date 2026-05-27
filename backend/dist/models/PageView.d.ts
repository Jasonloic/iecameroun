import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
export declare class PageView extends Model<InferAttributes<PageView>, InferCreationAttributes<PageView>> {
    id: CreationOptional<number>;
    visitorId: number;
    path: string;
    referrer: CreationOptional<string | null>;
    createdAt: CreationOptional<Date>;
    updatedAt: CreationOptional<Date>;
}
//# sourceMappingURL=PageView.d.ts.map