import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';
import {isArray} from 'lodash';
import {isObject} from 'lodash-es';

export interface CommandValidator {
  key: string;
  validators: ValidatorFn[];
}


@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  constructor(private formBuilder: FormBuilder) {
  }

  build(command: any, validators: CommandValidator[] = [], formArrayFields: string[] = []): FormGroup {
    const formCommand = {};

    Object.keys(command).forEach((key) => {
      const value = command[key];
      const validatorFns = this.getValidator(key, validators);

      formCommand[key] = [value, validatorFns];

      if (formArrayFields.includes(key) && isArray(value)) {
        const formGroupArray = [];

        value.forEach((item) => {
          formGroupArray.push(isObject(item) ? this.build(item, validators) : item);
        });

        formCommand[key] = this.formBuilder.array(formGroupArray);
      }

      if (!formArrayFields.includes(key) && !isArray(value) && isObject(value)) {
        const subFormValidator = this.extractSubValidator(key, validators);
        formCommand[key] = this.build(value, subFormValidator);
      }
    });

    return this.formBuilder.group(formCommand);
  }

  private extractSubValidator(key: string, validators: CommandValidator[]): CommandValidator[] {
    return validators
      .filter(val => val.key.startsWith(key))
      .map(val => ({key: val.key.replace(key + '.', ''), validators: val.validators}));
  }

  private getValidator(key: string, validators: CommandValidator[]): ValidatorFn[] {
    const validator = validators.find(validatorNode => validatorNode.key === key);

    if (!validator) {
      return [];
    }

    return validator.validators;
  }
}
