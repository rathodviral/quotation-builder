import { Injectable } from '@angular/core';
import { DynamicFormContol } from '../models/dynamic-form-control';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  constructor(private fb: FormBuilder) {}

  upadteFormGroup(formControls: DynamicFormContol<any>[]) {
    const group: any = {};
    formControls.forEach((element) => {
      group[element.key] =
        element.validations.length > 0
          ? this.fb.control(
              { value: element.value, disabled: element.isDisabled },
              element.validations
            )
          : this.fb.control({
              value: element.value,
              disabled: element.isDisabled,
            });
    });
    return new FormGroup(group);
  }
}
