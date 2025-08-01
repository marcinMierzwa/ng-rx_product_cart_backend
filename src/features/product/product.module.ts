import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from '../../core/database/database.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [DatabaseModule],
})
export class ProductModule {}
