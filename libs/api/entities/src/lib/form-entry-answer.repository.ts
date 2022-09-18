import { EntityRepository } from '@mikro-orm/postgresql';
import { FormEntryAnswerEntity } from './form-entry-answer.entity';

export class FormEntryAnswerRepository extends EntityRepository<FormEntryAnswerEntity> {}
