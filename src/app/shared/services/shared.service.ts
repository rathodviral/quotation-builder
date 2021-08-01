import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Loader, Alert, BreadCrumb } from '@app-models';
import { FormGroup } from '@angular/forms';

declare var swal;

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private loaderSubject = new Subject<Loader>();
  private alertSubject = new Subject<Alert>();
  private dataLoadSubject = new Subject<any>();
  $dataLoadSubject = this.dataLoadSubject.asObservable();

  constructor() {}

  loader(data: boolean) {
    const loaderData = new Loader(data);
    this.loaderSubject.next(loaderData);
  }

  setLoader() {
    return this.loaderSubject.asObservable();
  }

  alert(type: 'success' | 'danger' | 'warning', text) {
    const data = new Alert(type, text);
    this.alertSubject.next(data);
  }

  setAlert() {
    return this.alertSubject.asObservable();
  }

  triggerDataLoadSubject(data) {
    this.dataLoadSubject.next(data);
  }

  getBreadcrumbPath(path: string) {
    const addAngle = path.substr(1).split('/').join(' <i class="fa fa-angle-right" aria-hidden="true"></i> ');
    return addAngle.replace('core', ' <i class="fa fa-home" aria-hidden="true"></i> ');
  }

  markTochedInvalidFormControls(form: FormGroup) {
    for (const key in form.controls) {
      if (Object.prototype.hasOwnProperty.call(form.controls, key)) {
        const element = form.controls[key];
        if (element.invalid) {
          element.markAsTouched();
        }
      }
    }
  }

  showAlert(text: string, title?: string, type?: 'error' | 'success' | 'info') {
    if (title && type) {
      swal(title, text, type);
    } else if (title) {
      swal(title, text);
    } else {
      swal(text);
    }
  }

  number2text(value) {
    var fraction = Math.round(this.frac(value) * 100);
    var f_text = '';

    if (fraction > 0) {
      f_text = 'AND ' + this.convert_number(fraction) + ' PAISE';
    }

    return this.convert_number(value) + ' RUPEE ' + f_text + ' ONLY';
  }

  private frac(f) {
    return f % 1;
  }

  private convert_number(number) {
    if (number < 0 || number > 999999999) {
      return 'NUMBER OUT OF RANGE!';
    }
    var Gn = Math.floor(number / 10000000); /* Crore */
    number -= Gn * 10000000;
    var kn = Math.floor(number / 100000); /* lakhs */
    number -= kn * 100000;
    var Hn = Math.floor(number / 1000); /* thousand */
    number -= Hn * 1000;
    var Dn = Math.floor(number / 100); /* Tens (deca) */
    number = number % 100; /* Ones */
    var tn = Math.floor(number / 10);
    var one = Math.floor(number % 10);
    var res = '';

    if (Gn > 0) {
      res += this.convert_number(Gn) + ' CRORE';
    }
    if (kn > 0) {
      res += (res == '' ? '' : ' ') + this.convert_number(kn) + ' LAKH';
    }
    if (Hn > 0) {
      res += (res == '' ? '' : ' ') + this.convert_number(Hn) + ' THOUSAND';
    }

    if (Dn) {
      res += (res == '' ? '' : ' ') + this.convert_number(Dn) + ' HUNDRED';
    }

    var ones = Array(
      '',
      'ONE',
      'TWO',
      'THREE',
      'FOUR',
      'FIVE',
      'SIX',
      'SEVEN',
      'EIGHT',
      'NINE',
      'TEN',
      'ELEVEN',
      'TWELVE',
      'THIRTEEN',
      'FOURTEEN',
      'FIFTEEN',
      'SIXTEEN',
      'SEVENTEEN',
      'EIGHTEEN',
      'NINETEEN'
    );
    var tens = Array('', '', 'TWENTY', 'THIRTY', 'FOURTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY');

    if (tn > 0 || one > 0) {
      if (!(res == '')) {
        res += ' AND ';
      }
      if (tn < 2) {
        res += ones[tn * 10 + one];
      } else {
        res += tens[tn];
        if (one > 0) {
          res += '-' + ones[one];
        }
      }
    }

    if (res == '') {
      res = 'zero';
    }
    return res;
  }
}
