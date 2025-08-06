import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchemasModule } from './schemas/schemas.module';
import { SchemaEntity } from './schemas/schema.entity'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dev.db',
      entities: [SchemaEntity],
      synchronize: true,
    }),
    SchemasModule,
  ],
})
export class AppModule {}
