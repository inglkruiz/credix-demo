import type { FormEntry } from '@credix/api/types';
import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToOne,
  OneToMany,
  PrimaryKey,
} from '@mikro-orm/core';
import { FormDefinitionEntity } from './form-definition.entity';
import { FormEntryAnswerEntity } from './form-entry-answer.entity';
import { FormEntryRepository } from './form-entry.repository';

@Entity({
  tableName: 'FormEntry',
  customRepository: () => FormEntryRepository,
})
export class FormEntryEntity
  implements FormEntry<Collection<FormEntryAnswerEntity>>
{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @ManyToOne(() => FormDefinitionEntity)
  formDefinition!: FormDefinitionEntity;

  @OneToMany(
    () => FormEntryAnswerEntity,
    (formQuestion) => formQuestion.formEntry
  )
  answers = new Collection<FormEntryAnswerEntity>(this);

  [EntityRepositoryType]?: FormEntryRepository;
}
