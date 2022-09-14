import { Injectable } from '@nestjs/common';
import { CreateFormDefinitionDto } from './dto/create-form-definition.dto';
import { FormDefinitionRepository } from './form-definition.repository';

@Injectable()
export class FormService {
  constructor(
    private readonly formDefinitionRepository: FormDefinitionRepository
  ) {}

  public async create(createFormDefinitionDto: CreateFormDefinitionDto) {
    const entity = this.formDefinitionRepository.create(
      createFormDefinitionDto
    );

    this.formDefinitionRepository.persist(entity);

    await this.formDefinitionRepository.flush();

    console.log(entity);
  }
}
