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
import {
  FormQuestionAnswerType,
  FormQuestionAnswerTypeEnum,
} from '../enums/form-question-answer-type.enum';

class CreateFormDefinitionQuestionDto {
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

export class CreateFormDefinitionDto {
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
