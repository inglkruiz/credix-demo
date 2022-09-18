import { EntityRepository } from '@mikro-orm/postgresql';
import { FormEntryEntity } from './form-entry.entity';

export class FormEntryRepository extends EntityRepository<FormEntryEntity> {}
