import { Controller, Post, Get, Param, Delete, Body, ParseIntPipe } from '@nestjs/common';
import { SchemasService } from './schemas.service';
import { CreateSchemaDto } from './dto/create-schema.dto';

@Controller('schemas')
export class SchemasController {
  constructor(private readonly service: SchemasService) {}

  @Post()
  create(@Body() dto: CreateSchemaDto) {
    return this.service.createNewVersion(dto);
  }

  @Get(':id/latest')
  latest(@Param('id') id: string) {
    return this.service.getLatest(id);
  }

  @Get(':id/:version')
  byVersion(@Param('id') id: string, @Param('version', ParseIntPipe) version: number) {
    return this.service.getOne(id, version);
  }

  @Delete(':id/:version')
  remove(@Param('id') id: string, @Param('version', ParseIntPipe) version: number) {
    return this.service.deleteOne(id, version);
  }

  @Get()
  list() {
    return this.service.list();
  }
}
