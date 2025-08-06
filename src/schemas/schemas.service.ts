import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchemaEntity } from './schema.entity';
import { CreateSchemaDto } from './dto/create-schema.dto';
import { validateIsJsonSchema } from './ajv.provider';

@Injectable()
export class SchemasService {
  constructor(
    @InjectRepository(SchemaEntity)
    private readonly repo: Repository<SchemaEntity>,
  ) {}

  async createNewVersion(dto: CreateSchemaDto) {
    try {
      validateIsJsonSchema(dto.jsonSchema);
    } catch (e: any) {
      throw new BadRequestException({ message: 'Invalid JSON Schema', detail: e.message });
    }

    const { id } = dto;
    const { max } = await this.repo.createQueryBuilder('s')
      .select('MAX(s.version)', 'max')
      .where('s.formId = :id', { id })
      .getRawOne();

    const nextVersion = (Number(max) || 0) + 1;

    const entity = this.repo.create({
      formId: id,
      version: nextVersion,
      jsonSchema: dto.jsonSchema,
    });

    return this.repo.save(entity);
  }

  async getLatest(formId: string) {
    const entity = await this.repo.findOne({ where: { formId }, order: { version: 'DESC' } });
    if (!entity) throw new NotFoundException('Schema not found');
    return entity;
  }

  async getOne(formId: string, version: number) {
    const entity = await this.repo.findOne({ where: { formId, version } });
    if (!entity) throw new NotFoundException('Schema not found');
    return entity;
  }

  async deleteOne(formId: string, version: number) {
    const res = await this.repo.delete({ formId, version });
    if (!res.affected) throw new NotFoundException('Schema not found');
  }

  async list() {
    return this.repo.query(`
      SELECT s1.*
      FROM schemas s1
      JOIN (
        SELECT formId, MAX(version) as version FROM schemas GROUP BY formId
      ) s2 ON s1.formId = s2.formId AND s1.version = s2.version
      ORDER BY s1.formId ASC
    `);
  }
}
