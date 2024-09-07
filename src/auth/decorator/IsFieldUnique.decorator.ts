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
    const [field, collection] = args.constraints;

    //@ts-ignore
    const check = await prisma[collection].findUnique({
      where: { [field]: value },
    });
    console.log(check);

    if (!check) {
      return true;
    }
    return false;
  }
  defaultMessage(args?: ValidationArguments): string {
    return `${args.value} is already taken`;
  }
}

export function IsFieldUnique(
  field: string,
  collection: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [field, collection],
      validator: IsFieldUniqueConstraint,
    });
  };
}
