import {
  FormQuestion,
  FormQuestionAnswerType,
  FormQuestionAnswerTypeEnum,
} from '@credix/api/types';
import {
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { FormDefinitionEntity } from './form-definition.entity';
import { FormQuestionRepository } from './form-question.repository';

@Entity({
  tableName: 'FormQuestion',
  customRepository: () => FormQuestionRepository,
})
export class FormQuestionEntity implements FormQuestion {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property()
  question!: string;

  @Enum({
    items: () => FormQuestionAnswerTypeEnum,
  })
  answerType!: FormQuestionAnswerType;

  @ManyToOne(() => FormDefinitionEntity)
  formDefinition!: FormDefinitionEntity;

  [EntityRepositoryType]?: FormQuestionRepository;
}
