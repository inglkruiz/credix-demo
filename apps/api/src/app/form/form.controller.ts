import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFormDefinitionDto } from './dto/create-form-definition.dto';
import { FormService } from './form.service';

@ApiTags('forms')
@Controller('forms')
export class FormController {
  constructor(private readonly formDefinitionService: FormService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('definitions')
  async createFormDefinition(
    @Body() createFormDefinitionDto: CreateFormDefinitionDto
  ) {
    return this.formDefinitionService.create(createFormDefinitionDto);
  }
}
