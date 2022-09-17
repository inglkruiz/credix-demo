import {
  FormDefinitionRepository,
  FormQuestionRepository,
} from '@credix/api/entities';
import { ListFormDefinitionsResponse } from '@credix/api/types';
import { Injectable } from '@nestjs/common';
import { CreateFormDefinitionDto } from './dto/create-form-definition.dto';

@Injectable()
export class FormService {
  constructor(
    private readonly formDefinitionRepository: FormDefinitionRepository,
    private readonly formQuestionRepository: FormQuestionRepository
  ) {}

  public async list(): Promise<ListFormDefinitionsResponse> {
    const [data, counter] = await this.formDefinitionRepository.findAndCount(
      {},
      {
        populate: ['questions.id'],
        fields: ['id', 'name', 'description', 'questions.id'],
      }
    );

    return [
      data.map((item) => {
        const { id, name, description, questions } = item;
        return {
          id,
          name,
          description,
          numQuestions: questions.length,
        };
      }),
      counter,
    ];
  }

  public async get(id: string) {
    return await this.formDefinitionRepository.findOneOrFail(
      {
        id,
      },
      {
        populate: ['questions'],
      }
    );
  }

  public async create(createFormDefinitionDto: CreateFormDefinitionDto) {
    const formDefinitionEntity = this.formDefinitionRepository.create({
      name: createFormDefinitionDto.name,
      description: createFormDefinitionDto.description,
    });

    for (const item of createFormDefinitionDto.questions) {
      formDefinitionEntity.questions.add(
        this.formQuestionRepository.create({
          question: item.question,
          answerType: item.answerType,
          formDefinition: formDefinitionEntity,
        })
      );
    }

    await this.formDefinitionRepository.persistAndFlush(formDefinitionEntity);

    return {
      id: formDefinitionEntity.id,
    };
  }
}
