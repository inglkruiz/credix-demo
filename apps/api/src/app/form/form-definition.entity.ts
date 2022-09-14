import {
  Collection,
  Entity,
  EntityRepositoryType,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import {
  FormQuestionAnswerType,
  FormQuestionAnswerTypeEnum,
} from './enums/form-question-answer-type.enum';
import { FormDefinitionRepository } from './form-definition.repository';

@Entity({ customRepository: () => FormDefinitionRepository })
export class FormDefinitionEntity {
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

@Entity()
export class FormQuestionEntity {
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
}
