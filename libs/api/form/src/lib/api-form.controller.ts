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
import { ApiFormService } from './api-form.service';
import { CreateFormDefinitionDto } from './dto/create-form-definition.dto';
import { CreateFormEntryDto } from './dto/create-form-entry.dto';

@ApiTags('forms')
@Controller('forms')
export class ApiFormController {
  constructor(private readonly formDefinitionService: ApiFormService) {}

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

  @HttpCode(HttpStatus.CREATED)
  @Post(':formId/entries')
  createEntry(
    @Param('formId') formId: string,
    @Body() createFormDefinitionDto: CreateFormEntryDto
  ) {
    return this.formDefinitionService.createEntry(
      formId,
      createFormDefinitionDto
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get(':formId/entries')
  listFormEntries(@Param('formId') formId: string) {
    return this.formDefinitionService.listEntries(formId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':formId/entries/:entryId')
  getFormEntry(
    @Param('formId') formId: string,
    @Param('entryId') entryId: string
  ) {
    return this.formDefinitionService.getEntry(formId, entryId);
  }
}
