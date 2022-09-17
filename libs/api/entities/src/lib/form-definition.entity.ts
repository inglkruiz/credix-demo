import { FormDefinition } from '@credix/api/types';
import {
  Collection,
  Entity,
  EntityRepositoryType,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { FormDefinitionRepository } from './form-definition.repository';
import { FormQuestionEntity } from './form-question.entity';

@Entity({ customRepository: () => FormDefinitionRepository })
export class FormDefinitionEntity
  implements FormDefinition<Collection<FormQuestionEntity>>
{
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property()
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @OneToMany(
    () => FormQuestionEntity,
    (formQuestion) => formQuestion.formDefinition
  )
  questions = new Collection<FormQuestionEntity>(this);

  [EntityRepositoryType]?: FormDefinitionRepository;
}
