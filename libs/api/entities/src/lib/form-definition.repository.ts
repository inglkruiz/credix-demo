import { EntityRepository } from '@mikro-orm/postgresql';
import { FormDefinitionEntity } from './form-definition.entity';

export class FormDefinitionRepository extends EntityRepository<FormDefinitionEntity> {}
