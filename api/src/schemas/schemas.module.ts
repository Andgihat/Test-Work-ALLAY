import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemasController } from './schemas.controller';
import { SchemasService } from './schemas.service';
import { SchemaEntity } from './schema.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchemaEntity])],
  controllers: [SchemasController],
  providers: [SchemasService],
})
export class SchemasModule {}

