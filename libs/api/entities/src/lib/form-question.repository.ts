import { EntityRepository } from '@mikro-orm/postgresql';
import { FormQuestionEntity } from './form-question.entity';

export class FormQuestionRepository extends EntityRepository<FormQuestionEntity> {}
