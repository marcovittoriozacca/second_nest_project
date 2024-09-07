import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable({})
@ValidatorConstraint({ async: true })
export class IsFieldUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [field, collection, reverse = false] = args.constraints;

    //@ts-ignore
    const check = await prisma[collection].findUnique({
      where: { [field]: value },
    });

    if (!reverse) {
      if (!check) {
        return true;
      } else {
        return false;
      }
    }

    if (reverse) {
      if (!check) {
        return false;
      } else {
        return true;
      }
    }
  }
  defaultMessage(args?: ValidationArguments): string {
    return `${args.value} is already taken`;
  }
}

export function IsFieldUnique(
  field: string,
  collection: string,
  reverse?: boolean,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [field, collection, reverse],
      validator: IsFieldUniqueConstraint,
    });
  };
}
