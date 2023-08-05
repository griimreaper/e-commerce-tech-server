import { CreateProductDto } from "src/products/dto/create-products.dto"
import { CreateUserDto } from "src/users/dto/create-users.dto"

export class BuysDto {
    id_product: string
    id_user:string
    user?:CreateUserDto
    product?:CreateProductDto
    name?:string
    username?:string
    email?:string
    address?:string
    payment?:number
}