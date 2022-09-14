import { EntityRepository } from '@mikro-orm/postgresql'; // or any other driver package
import { FormDefinitionEntity } from './form-definition.entity';

export class FormDefinitionRepository extends EntityRepository<FormDefinitionEntity> {}
