import {
    AutoIncrement,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Users } from '../users/users.entity';
import { Products } from '../products/products.entity';

@Table({
    timestamps:true,
    createdAt:'purchaseDate',
    updatedAt:'deliveredDate',
    tableName:'buys',
})
export class Buys extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    productBrand:string;

    @Column
    productModel:string;

    @Column
    buyerUsername:string

    @Column
    buyerEmail:string

    @ForeignKey(() => Products)
    id_product: string;

    @ForeignKey(() => Users)
    id_user: string;

    @BelongsTo(() => Users)
    User: string;

    @BelongsTo(() => Products)
    Product: Products;

    @Column({ type: 'float' }) // Agregar atributo floatAttribute de tipo float
    mount: number;

    @Column
    paymentId: string; // Nueva propiedad para almacenar el ID de pago
}
