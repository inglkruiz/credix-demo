import type { CreateFormEntryAnswer } from '@credix/api/types';
import {
  isDate,
  isIn,
  isInt,
  isLatLong,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import dayjs from 'dayjs';

export function IsCorrectEntryAnswerType() {
  return function (object: CreateFormEntryAnswer, propertyName: string) {
    registerDecorator({
      name: 'isCorrectAnswerType',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const answerObj = args.object as CreateFormEntryAnswer;
          switch (answerObj.answerType) {
            case 'boolean':
              return isIn(value, ['True', 'False']);
            case 'date': {
              const dayjsDate = dayjs(+value);
              return isDate(dayjsDate.toDate()) && dayjsDate.isBefore(dayjs());
            }
            case 'integer':
              return isInt(+value);
            case 'location':
              return isLatLong(value);
            // No need to validate strings, all values are strings
            case 'string':
              return true;
            default:
              return false;
          }
        },
      },
    });
  };
}
