import {
  FormDefinitionRepository,
  FormEntryAnswerRepository,
  FormEntryRepository,
  FormQuestionRepository,
} from '@credix/api/entities';
import type { ListFormDefinitionsResponse } from '@credix/api/types';
import { LoadStrategy } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import type { CreateFormDefinitionDto } from './dto/create-form-definition.dto';
import type { CreateFormEntryDto } from './dto/create-form-entry.dto';

@Injectable()
export class ApiFormService {
  constructor(
    private readonly formDefinitionRepository: FormDefinitionRepository,
    private readonly formQuestionRepository: FormQuestionRepository,
    private readonly formEntryRepository: FormEntryRepository,
    private readonly formEntryAnswerRepository: FormEntryAnswerRepository
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
  public async createEntry(
    formId: string,
    createFormEntryDto: CreateFormEntryDto
  ) {
    const formEntryEntity = this.formEntryRepository.create({
      formDefinition: formId,
    });

    for (const item of createFormEntryDto.answers) {
      formEntryEntity.answers.add(
        this.formEntryAnswerRepository.create({
          formEntry: formEntryEntity,
          question: item.questionId,
          answer: item.answer,
        })
      );
    }

    await this.formEntryRepository.persistAndFlush(formEntryEntity);

    return {
      id: formEntryEntity.id,
    };
  }

  public async listEntries(formId: string) {
    const formDefinition = await this.formDefinitionRepository.findOneOrFail({
      id: {
        $eq: formId,
      },
    });

    return {
      formName: formDefinition.name,
      entries: await this.formEntryRepository.findAndCount(
        {
          formDefinition: {
            id: {
              $eq: formId,
            },
          },
        },
        {
          fields: [
            'id',
            { answers: ['answer', { question: ['question', 'answerType'] }] },
          ],
          strategy: LoadStrategy.JOINED,
        }
      ),
    };
  }

  public async getEntry(formId: string, entryId: string) {
    return await this.formEntryRepository.findOneOrFail(
      {
        id: {
          $eq: entryId,
        },
        formDefinition: {
          id: {
            $eq: formId,
          },
        },
      },
      {
        fields: [
          { answers: ['answer', { question: ['question', 'answerType'] }] },
          { formDefinition: ['name', 'description'] },
        ],
        strategy: LoadStrategy.JOINED,
      }
    );
  }
}
