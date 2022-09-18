import {
  FormDefinitionEntity,
  FormEntryAnswerEntity,
  FormEntryEntity,
  FormQuestionEntity,
} from '@credix/api/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ApiFormController } from './api-form.controller';
import { ApiFormService } from './api-form.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [
        FormDefinitionEntity,
        FormQuestionEntity,
        FormEntryEntity,
        FormEntryAnswerEntity,
      ],
    }),
  ],
  controllers: [ApiFormController],
  providers: [ApiFormService],
})
export class ApiFormModule {}
