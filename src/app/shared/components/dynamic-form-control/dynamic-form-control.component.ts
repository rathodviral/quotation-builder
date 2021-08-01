import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormContol } from '@app-models';
import { SharedService } from '@app-services';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.css'],
})
export class DynamicFormControlComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() formControls: DynamicFormContol<any>;
  @Input() currency: string;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}

  calculateAmount() {
    const { controlType, parentIndex, key } = this.formControls;
    const { quantity, rate, gst = 0 } = this.form.value;
    const data = {
      quantity,
      rate,
      gst,
      controlType,
      parentIndex,
      key,
    };
    this.sharedService.triggerDataLoadSubject(data);
  }
}
