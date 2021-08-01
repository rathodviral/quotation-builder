import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddRemoveColumnDialogComponent, ChangeFormatDialogComponent } from '@app-components';
import converter from 'number-to-words';
import { SharedService } from '@app-services';
import { EDIt_FORM, ADD_FORM } from '@app-mocks';
import { Subscription } from 'rxjs';
import { LocalStorageUtility } from '@app-utilities';
import { COUNTRY_LIST, CURRENCY_LIST, GST_TYPE_LIST, LOCAL_STORAGE } from '@app-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataForm = this.fb.group({
    title: ['Quotation', Validators.required],
    header: this.fb.array([]),
    selfDetail: this.fb.group({
      country: ['India', Validators.required],
      name: ['Company Name', Validators.required],
      email: ['name@company.com', [Validators.required, Validators.email]],
      phone: ['8888888888', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gstin: [''],
      pan: [''],
      city: ['Ahemdabad', Validators.required],
      zipCode: ['380021', Validators.required],
      state: ['Gujrat', Validators.required],
      other: this.fb.array([]),
    }),
    clientDetail: this.fb.group({
      country: ['India', Validators.required],
      name: ['Company Name', Validators.required],
      email: ['name@company.com', [Validators.required, Validators.email]],
      phone: ['8888888888', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gstin: [''],
      pan: [''],
      city: ['Ahemdabad', Validators.required],
      zipCode: ['380021', Validators.required],
      state: ['Gujrat', Validators.required],
      other: this.fb.array([]),
    }),
    options: this.fb.group({
      gst: [false],
      gstType: [''],
      currency: ['Rupee', Validators.required],
      format: ['00001'],
      decimalPonit: [2],
    }),
    billing: this.fb.array([]),
    extraCharge: this.fb.array([]),
    termsCondtion: this.fb.array([]),
  });
  isTitleFieldShow: boolean = false;
  cityList: string[] = COUNTRY_LIST;
  gstTypeList: string[] = GST_TYPE_LIST;
  currencyList: string[] = CURRENCY_LIST;
  billingColumnsList: any[] = [];

  dataSub: Subscription;
  isEdit: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((param) => {
      this.isEdit = param && param.id;
      this.setFormValue(param.id);
    });
  }

  get titleCtrl() {
    return this.dataForm.get('title');
  }

  get header() {
    return this.dataForm.get('header') as FormArray;
  }

  get selfDetail() {
    return this.dataForm.get('selfDetail');
  }
  get otherSelfDetail() {
    return this.selfDetail.get('other') as FormArray;
  }
  get clientDetail() {
    return this.dataForm.get('clientDetail');
  }

  get otherClientDetail() {
    return this.clientDetail.get('other') as FormArray;
  }

  get options() {
    return this.dataForm.get('options');
  }

  get isGSTAdded() {
    return this.options.get('gst').value;
  }

  get gstType() {
    return this.options.get('gstType').value;
  }

  get currency() {
    return this.options.get('currency').value;
  }

  get decimalPonit() {
    return this.options.get('decimalPonit');
  }

  get currencyDecimal() {
    return `2.2-2`;
  }

  get billing() {
    return this.dataForm.get('billing') as FormArray;
  }

  get extraCharge() {
    return this.dataForm.get('extraCharge') as FormArray;
  }

  get termsCondtion() {
    return this.dataForm.get('termsCondtion') as FormArray;
  }

  get igstTotal() {
    const billing = this.billing.value;
    const rowTotal = billing.map((x) => {
      if (x.igst) {
        return x.igst;
      }
      return 0;
    });
    return rowTotal.reduce((a, b) => a + b);
  }

  get sgstTotal() {
    const billing = this.billing.value;
    const rowTotal = billing.map((x) => {
      if (x.cgst) {
        return x.cgst;
      }
      return 0;
    });
    return rowTotal.reduce((a, b) => a + b);
  }

  get amountTotal() {
    const billing = this.billing.value;
    const rowTotal = billing.map((x) => {
      if (x.rate && x.quantity) {
        return x.rate * x.quantity;
      }
      return 0;
    });
    return rowTotal.reduce((a, b) => a + b);
  }

  get total() {
    const billing = this.billing.value;
    const rowTotal = billing.map((x) => {
      if (x.amount) {
        return x.amount;
      }
      return 0;
    });
    const extraCharge = this.extraCharge.value;
    const extraChargeTotal = extraCharge.map((x) => {
      if (x.value) {
        return x.value;
      }
      return 0;
    });
    const t = rowTotal.reduce((a, b) => a + b);
    const e = extraChargeTotal.length > 0 ? extraChargeTotal.reduce((a, b) => a + b) : 0;
    return (t + e).toFixed(2);
  }

  get totalInWord() {
    return this.currency === 'Rupee'
      ? this.sharedService.number2text(this.total)
      : `${converter.toWords(this.total)} ${this.currency} only`;
  }

  ngOnInit(): void {
    this.dataSub = this.sharedService.$dataLoadSubject.subscribe((res) => {
      this.updateBilling(res);
    });
  }

  private addBillingColumns() {
    const group = {};
    this.billingColumnsList.forEach((element) => {
      const { key, value } = element;
      group[key] = this.fb.control(value, [Validators.required]);
    });
    group['description'] = this.fb.control(null);
    this.billing.push(new FormGroup(group));
    this.updateBilling();
  }

  private changeDecimalPoints(amount) {
    return parseFloat(amount.toFixed(this.decimalPonit.value));
  }

  private updateBilling(data?: any) {
    const updateRowValue = (i, v) => {
      const { quantity, rate, gst } = v;
      const gstAmount = this.isGSTAdded ? (gst * quantity * rate) / 100 : 0;
      const total = quantity * rate + gstAmount;
      this.billing.controls[i].get('amount').setValue(this.changeDecimalPoints(total));
      if (this.gstType) {
        if (this.gstType === 'IGST') {
          this.billing.controls[i].get('igst').setValue(this.changeDecimalPoints(gstAmount));
        } else {
          this.billing.controls[i].get('cgst').setValue(this.changeDecimalPoints(gstAmount / 2));
          this.billing.controls[i].get('sgst').setValue(this.changeDecimalPoints(gstAmount / 2));
        }
      }
    };
    if (data) {
      const { parentIndex } = data;
      updateRowValue(parentIndex, data);
    } else {
      this.billing.controls.forEach((row, index) => {
        updateRowValue(index, row.value);
      });
    }
  }

  private changeBillingColumns() {
    this.billing.controls.forEach((row, index) => {
      const group = {};
      this.billingColumnsList.forEach((element) => {
        const { key, value } = element;
        if (key === 'quantity' || key === 'rate') {
          const rowValue = row.value[key];
          group[key] = this.fb.control(rowValue, [Validators.required]);
        } else {
          group[key] = this.fb.control(value, [Validators.required]);
        }
      });
      group['description'] = this.fb.control(null);
      this.billing.setControl(index, new FormGroup(group));
    });
    this.updateBilling();
  }

  private getFilteredColumns() {
    return this.billingColumnsList.filter((x) => {
      if (
        !(
          x.key === 'igst' ||
          x.key === 'cgst' ||
          x.key === 'sgst' ||
          x.key === 'amount' ||
          x.key === 'hsn' ||
          x.key === 'gst' ||
          x.key === 'quantity' ||
          x.key === 'rate' ||
          x.key === 'item'
        )
      ) {
        return x;
      }
    });
  }

  private setFormValue(id?: string) {
    const { title, header, billingColumnsList, selfDetail, clientDetail, options, billing, extraCharge, termsCondtion } = this.isEdit
      ? LocalStorageUtility.getData(LOCAL_STORAGE.list)
        ? LocalStorageUtility.getData(LOCAL_STORAGE.list)
        : EDIt_FORM
      : ADD_FORM;
    this.billingColumnsList = billingColumnsList;
    this.titleCtrl.patchValue(title);
    this.selfDetail.patchValue(selfDetail);
    this.clientDetail.patchValue(clientDetail);
    this.options.patchValue(options);

    header.forEach((element) => {
      this.header.push(
        this.fb.group({
          label: [element.label, Validators.required],
          value: [element.value, Validators.required],
        })
      );
    });
    selfDetail.other.forEach((element) => {
      this.otherSelfDetail.push(
        this.fb.group({
          label: [element.label, Validators.required],
          value: [element.value, Validators.required],
        })
      );
    });
    clientDetail.other.forEach((element) => {
      this.otherClientDetail.push(
        this.fb.group({
          label: [element.label, Validators.required],
          value: [element.value, Validators.required],
        })
      );
    });
    billing.forEach((element) => {
      const group = {};
      this.billingColumnsList.forEach((e) => {
        const { key } = e;
        group[key] = this.fb.control(element[key], [Validators.required]);
      });
      group['description'] = this.fb.control(element.description);
      this.billing.push(new FormGroup(group));
    });
    extraCharge.forEach((element) => {
      this.extraCharge.push(
        this.fb.group({
          label: [element.label, Validators.required],
          value: [element.value, Validators.required],
        })
      );
    });
    termsCondtion.forEach((element) => {
      this.termsCondtion.push(this.fb.control(element));
    });
    this.updateBilling();
  }

  addHeader() {
    this.header.push(
      this.fb.group({
        label: ['', Validators.required],
        value: ['', Validators.required],
      })
    );
  }

  removeHeader(index: number) {
    this.header.removeAt(index);
  }

  addBilling() {
    this.addBillingColumns();
  }

  addDescription(pindex) {
    this.billing.controls[pindex].get('description').setValue('Description');
  }

  removeBilling(index: number) {
    this.billing.removeAt(index);
  }

  addExtraCharge() {
    this.extraCharge.push(
      this.fb.group({
        label: ['Extra Charge'],
        value: [0],
      })
    );
  }

  removeExtraCharge(index: number) {
    this.extraCharge.removeAt(index);
  }

  addOtherSelfDetail() {
    this.otherSelfDetail.push(
      this.fb.group({
        label: ['', Validators.required],
        value: ['', Validators.required],
      })
    );
  }

  removeOtherSelfDetail(index: number) {
    this.otherSelfDetail.removeAt(index);
  }

  addClientSelfDetail() {
    this.otherClientDetail.push(
      this.fb.group({
        label: ['', Validators.required],
        value: ['', Validators.required],
      })
    );
  }

  removeClientSelfDetail(index: number) {
    this.otherClientDetail.removeAt(index);
  }
  addTermsCondtion() {
    this.termsCondtion.push(this.fb.control(''));
  }

  removeTermsCondtion(index: number) {
    this.termsCondtion.removeAt(index);
  }

  gstChange() {
    if (!this.isGSTAdded) {
      this.options.get('gstType').setValue(null);
      const billingColumns = this.getFilteredColumns();
      billingColumns.push({ key: 'quantity', label: 'Quantity', type: 'number', value: 1 });
      billingColumns.push({ key: 'rate', label: 'Rate', type: 'number', value: 1 });
      billingColumns.unshift({ key: 'item', label: 'Item', type: 'text', value: 'Item' });
      billingColumns.push({ key: 'amount', label: 'Amount', type: 'number', value: 1.0 });
      this.billingColumnsList = billingColumns;
      this.changeBillingColumns();
    }
  }

  gstOptionChange() {
    if (this.gstType === 'IGST' || this.gstType === 'CGST & SGST') {
      const billingColumns = this.getFilteredColumns();
      billingColumns.push({ key: 'quantity', label: 'Quantity', type: 'number', value: 1 });
      billingColumns.push({ key: 'rate', label: 'Rate', type: 'number', value: 1 });
      if (this.gstType === 'IGST') {
        billingColumns.push({ key: 'igst', label: 'IGST', type: 'number', value: 0.18 });
      } else {
        billingColumns.push(
          { key: 'cgst', label: 'CGST', type: 'number', value: 0.9 },
          { key: 'sgst', label: 'SGST', type: 'number', value: 0.9 }
        );
      }
      billingColumns.unshift({ key: 'gst', label: 'GST', type: 'number', value: 18 });
      billingColumns.unshift({ key: 'hsn', label: 'HSN/SAC', type: 'text', value: 'HSN/SAC' });
      billingColumns.unshift({ key: 'item', label: 'Item', type: 'text', value: 'Item' });
      billingColumns.push({ key: 'amount', label: 'Amount', type: 'number', value: 1.0 });
      this.billingColumnsList = billingColumns;
    }
    this.changeBillingColumns();
  }

  openChangeFormatDialog() {
    const dialogRef = this.dialog.open(ChangeFormatDialogComponent, { width: '60%', data: this.decimalPonit.value });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.decimalPonit.setValue(Number(result) || 2);
        this.updateBilling();
      }
    });
  }

  openAddRenameDialog() {
    const dialogRef = this.dialog.open(AddRemoveColumnDialogComponent, { width: '60%', data: this.billingColumnsList });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.billingColumnsList = JSON.parse(result) || [];
        this.changeBillingColumns();
      }
    });
  }

  onSubmit() {
    const data = { ...this.dataForm.value, billingColumnsList: this.billingColumnsList };
    LocalStorageUtility.setData(LOCAL_STORAGE.list, data);
  }
}
