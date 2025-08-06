import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique, Index } from 'typeorm';

@Entity('schemas')
@Unique(['formId', 'version'])
export class SchemaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  formId: string;

  @Column()
  version: number;

  @Column({ type: 'simple-json' })
  jsonSchema: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
