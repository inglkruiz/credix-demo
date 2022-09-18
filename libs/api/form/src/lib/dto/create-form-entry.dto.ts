import type {
  CreateFormEntry,
  CreateFormEntryAnswer,
  FormQuestionAnswerType,
} from '@credix/api/types';
import { FormQuestionAnswerTypeEnum } from '@credix/api/types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { IsCorrectEntryAnswerType } from '../validators/IsCorrectAnswerType';

export class CreateFormEntryAnswerDto implements CreateFormEntryAnswer {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @IsCorrectEntryAnswerType()
  answer!: string;

  @ApiProperty({ enum: FormQuestionAnswerTypeEnum })
  @IsEnum(FormQuestionAnswerTypeEnum)
  answerType!: FormQuestionAnswerType;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  questionId!: string;
}

export class CreateFormEntryDto implements CreateFormEntry {
  @ApiProperty({
    type: [CreateFormEntryAnswerDto],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateFormEntryAnswerDto)
  answers!: CreateFormEntryAnswerDto[];
}
