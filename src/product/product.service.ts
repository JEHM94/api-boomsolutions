import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  // Crea un nuevo Producto en la base de datos
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  // Muestra todos los Productos
  async findAll() {
    return await this.productRepository.find();
  }

  // Busca un Producto a través su ID
  async findOne(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  // Actualiza un Producto a través su ID
  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id, updateProductDto);
  }

  // Eliminación lógica de un Producto a través  de su ID
  async remove(id: number) {
    return await this.productRepository.softDelete({ id });
  }
}
