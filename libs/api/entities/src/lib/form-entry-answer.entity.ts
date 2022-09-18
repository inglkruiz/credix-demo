import type { FormEntryAnswer } from '@credix/api/types';
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { FormEntryAnswerRepository } from './form-entry-answer.repository';
import { FormEntryEntity } from './form-entry.entity';
import { FormQuestionEntity } from './form-question.entity';

@Entity({
  tableName: 'FormEntryAnswer',
  customRepository: () => FormEntryAnswerRepository,
})
export class FormEntryAnswerEntity implements FormEntryAnswer {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property()
  answer!: string;

  @ManyToOne(() => FormQuestionEntity)
  question!: FormQuestionEntity;

  @ManyToOne(() => FormEntryEntity)
  formEntry!: FormEntryEntity;

  [EntityRepositoryType]?: FormEntryAnswerRepository;
}
