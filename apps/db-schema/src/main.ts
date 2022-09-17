import { FormDefinitionEntity, FormQuestionEntity } from '@credix/api/entities';
import { MikroORM } from '@mikro-orm/core';

(async () => {
  const orm = await MikroORM.init({
    entities: [FormDefinitionEntity, FormQuestionEntity],
    type: 'postgresql',
    host: process.env.API_POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB,
    debug: true,
  });
  const generator = orm.getSchemaGenerator();

  const dropDump = await generator.getDropSchemaSQL();
  console.log(dropDump);

  const createDump = await generator.getCreateSchemaSQL();
  console.log(createDump);

  const updateDump = await generator.getUpdateSchemaSQL();
  console.log(updateDump);

  // there is also `generate()` method that returns drop + create queries
  const dropAndCreateDump = await generator.generate();
  console.log(dropAndCreateDump);

  // or you can run those queries directly, but be sure to check them first!
  await generator.dropSchema();
  await generator.createSchema();
  await generator.updateSchema();

  // in tests it can be handy to use those:
  await generator.refreshDatabase(); // ensure db exists and is fresh
  await generator.clearDatabase(); // removes all data

  await orm.close(true);
})();
