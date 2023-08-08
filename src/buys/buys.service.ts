import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Products } from 'src/products/products.entity';
import { Buys } from './buys.entity';
import { Users } from 'src/users/users.entity';
import { BuysDto } from './dto/BuysDto';

@Injectable()
export class BuysService {
    constructor (
        @Inject('BUYS_REPOSITORY') private readonly buysRepository: typeof Buys,
        @Inject('PRODUCTS_REPOSITORY') private readonly productsRepository: typeof Products,
        @Inject('USERS_REPOSITORY') private readonly usersRepository: typeof Users,
    ) {}

    async getBuys(): Promise<BuysDto[]> {
        return this.buysRepository.findAll();
    }

    async buyProduct({id_product, id_user}:BuysDto): Promise<BuysDto> {
        try {
            const userData = await this.usersRepository.findByPk(id_user)
            const shoesData = await this.productsRepository.findByPk(id_product)

            if (!shoesData.isActive) throw new HttpException('NO STOCK', 400)

            shoesData.isActive = false
            shoesData.save();

            return await this.buysRepository.create({
                id_user: userData.id,
                buyerUsername: userData.username,
                buyerEmail: userData.email,
                id_product: shoesData.id,
                productBrand: shoesData.brand,
                productModel: shoesData.model,
                mount: shoesData.price,
            })


        } catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }
}
