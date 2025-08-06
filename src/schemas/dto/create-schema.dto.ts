import { IsString, IsObject } from 'class-validator';

export class CreateSchemaDto {
  @IsString()
  id: string;

  @IsObject()
  jsonSchema: Record<string, any>;
}
