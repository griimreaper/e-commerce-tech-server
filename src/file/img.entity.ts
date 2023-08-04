import { DataTypes, Model, UUIDV4 } from "sequelize";
import { Column, Table } from "sequelize-typescript";

@Table
export class Img extends Model<Img> {
    @Column({
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataTypes.ARRAY(DataTypes.STRING),
        validate: {
            isUrl: true,
        }
    })
    urls: Array<string>;
}