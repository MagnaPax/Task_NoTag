import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Intermediate } from 'src/intermediate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Intermediate])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
