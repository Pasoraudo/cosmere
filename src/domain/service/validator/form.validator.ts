import {FormGroup, ValidationErrors} from '@angular/forms';
import {trans} from 'domain/service/translations/translator.service';

export interface FormErrors {
  name: string;
  message: string;
}

export const extractErrors = (form: FormGroup): FormErrors[] => {
  const errors: FormErrors[] = [];
  const controls = form.controls;

  // eslint-disable-next-line guard-for-in
  for (const key in form.controls) {
    const fieldError: ValidationErrors = form.controls[key].errors;

    if (!fieldError)
      continue;

    for (const errorKey in fieldError) {
      if (errorKey === 'required')
        errors.push({name: key, message: trans(key) + ' está vacío'});
    }


    return errors;
  }
};
