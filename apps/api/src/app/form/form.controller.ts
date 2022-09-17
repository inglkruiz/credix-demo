import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFormDefinitionDto } from './dto/create-form-definition.dto';
import { FormService } from './form.service';

@ApiTags('forms')
@Controller('forms')
export class FormController {
  constructor(private readonly formDefinitionService: FormService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('definitions')
  createFormDefinition(
    @Body() createFormDefinitionDto: CreateFormDefinitionDto
  ) {
    return this.formDefinitionService.create(createFormDefinitionDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('definitions')
  listFormDefinition() {
    return this.formDefinitionService.list();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':formId')
  getFormDefinition(@Param('formId') formId: string) {
    return this.formDefinitionService.get(formId);
  }
}
