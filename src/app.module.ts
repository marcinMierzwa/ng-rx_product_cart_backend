import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { CategoryModule } from './features/category/category.module';
import { ProductModule } from './features/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CoreModule,
    DatabaseModule,
    CategoryModule,
    ProductModule],
})
export class AppModule {}
