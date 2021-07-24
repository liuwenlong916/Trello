import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'
export function IsSameValue(property: string, options: ValidationOptions) {
  return function (
    target: Object,
    propertyName: string,
  ) {
    registerDecorator({
      name: 'isSameValue',
      target: target.constructor,
      propertyName,
      constraints: [property],//接受所有参数
      options,
      validator: {
        validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
          const relatedValue = validationArguments && (validationArguments.object as any)[property]
          return relatedValue === value
        }
      }
    })
  }
}