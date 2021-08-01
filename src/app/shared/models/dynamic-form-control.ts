import { Validators } from '@angular/forms';

export class DynamicFormContol<T> {
  value: T;
  controlType: 'textbox' | 'dropdown' | 'checkbox' | 'datepicker';
  key: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password';
  options: { key: string; value: string }[];
  validations: any[];
  placeholder: string;
  isDisabled: boolean;
  designClass: string;
  parentIndex: number;
  constructor(
    controlObj: {
      value?: T;
      controlType?: 'textbox' | 'dropdown' | 'checkbox' | 'datepicker';
      key?: string;
      label?: string;
      type?: 'text' | 'number' | 'email' | 'password';
      options?: { key: string; value: string }[];
      validations?: any[];
      placeholder?: string;
      isDisabled?: boolean;
      designClass?: string;
      parentIndex?: number;
    } = {}
  ) {
    this.value = controlObj.value;
    this.controlType = controlObj.controlType || 'textbox';
    this.key = controlObj.key || '';
    this.label = controlObj.label || null;
    this.type = controlObj.type || null;
    this.options = controlObj.options || null;
    this.validations = controlObj.validations || [];
    this.placeholder = controlObj.placeholder || '';
    this.isDisabled = controlObj.isDisabled || false;
    this.designClass = controlObj.designClass || '';
    this.parentIndex = controlObj.parentIndex || -1;
  }
}
