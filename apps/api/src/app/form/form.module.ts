import { FormDefinitionEntity, FormQuestionEntity } from '@credix/api/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [FormDefinitionEntity, FormQuestionEntity],
    }),
  ],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
