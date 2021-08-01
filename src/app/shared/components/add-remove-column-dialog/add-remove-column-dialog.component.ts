import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-remove-column-dialog',
  templateUrl: './add-remove-column-dialog.component.html',
  styleUrls: ['./add-remove-column-dialog.component.css'],
})
export class AddRemoveColumnDialogComponent implements OnInit {
  dataForm = this.fb.group({
    billingColumns: this.fb.array([]),
  });
  inputTypeList: any[] = [
    { key: 'Text', value: 'text' },
    { key: 'Number', value: 'number' },
    { key: 'Date', value: 'date' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRemoveColumnDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get billingColumns() {
    return this.dataForm.get('billingColumns') as FormArray;
  }

  ngOnInit(): void {
    this.data.forEach((element, index) => {
      const { label, value, type, key } = element;
      const group = this.fb.group({
        key: [key, [Validators.required]],
        label: [label],
        value: [value],
        type: [type, [Validators.required]],
      });
      this.billingColumns.push(group);
    });
  }

  addHeader(event) {
    event.stopPropagation();
    this.billingColumns.controls.splice(
      1,
      0,
      this.fb.group({
        key: [`item${this.billingColumns.length}`, Validators.required],
        label: [`Item ${this.billingColumns.length}`],
        type: ['text', Validators.required],
        value: [`Item ${this.billingColumns.length}`],
      })
    );
    this.billingColumns.controls.forEach((element, index) => {
      this.billingColumns.setControl(index, element);
    });
  }

  removeHeader(index: number) {
    this.billingColumns.removeAt(index);
  }

  labelChange(index) {
    const { label, type, key } = this.billingColumns.controls[index].value;

    if (
      !(
        key === 'item' ||
        key === 'quantity' ||
        key === 'rate' ||
        key === 'gst' ||
        key === 'sgst' ||
        key === 'igst' ||
        key === 'cgst' ||
        key === 'amount'
      )
    ) {
      this.billingColumns.controls[index].get('key').setValue(label.toLowerCase() + this.billingColumns.length);
      this.billingColumns.controls[index].get('value').setValue(type === 'text' ? label : 0);
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      return;
    }
    this.openAddRenameDialog();
  }

  openAddRenameDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { width: '40%' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close(JSON.stringify(this.billingColumns.value));
      } else {
        this.dialogRef.close();
      }
    });
  }
}
