import type {
  CreateFormDefinition,
  CreateFormDefinitionQuestion,
  FormQuestionAnswerType,
} from '@credix/api/types';
import { FormQuestionAnswerTypeEnum } from '@credix/api/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class CreateFormDefinitionQuestionDto implements CreateFormDefinitionQuestion {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  question!: string;

  @ApiProperty({ enum: FormQuestionAnswerTypeEnum })
  @IsEnum(FormQuestionAnswerTypeEnum)
  answerType!: FormQuestionAnswerType;
}

export class CreateFormDefinitionDto implements CreateFormDefinition {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  description?: string;

  @ApiProperty({
    type: [CreateFormDefinitionQuestionDto],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateFormDefinitionQuestionDto)
  questions!: CreateFormDefinitionQuestionDto[];
}
