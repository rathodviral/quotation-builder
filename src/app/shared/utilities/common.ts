import { HttpParams } from '@angular/common/http';

export class CommonUtility {
  static isNull(item): boolean {
    return item === undefined || item === null;
  }

  static isEmpty(item): boolean {
    return (
      item === undefined ||
      item === null ||
      item.length === 0 ||
      item === 0 ||
      item === '' ||
      item === 'null'
    );
  }

  static isNotNull(item): boolean {
    return item !== undefined && item !== null;
  }

  static isNotEmpty(item): boolean {
    return item !== undefined && item !== null && item.length !== 0;
  }

  static isObjectEmpty(obj): boolean {
    return (
      CommonUtility.isNull(obj) ||
      Object.keys(obj).length === 0 ||
      !Object.keys(obj).some((k) => CommonUtility.isNotEmpty(obj[k]))
    );
  }

  static splitKeys(keys: string, separator: string = ','): string[] {
    return keys.split(separator);
  }

  static convertObjectToParams(paramObj: object) {
    let params = new URLSearchParams();
    for (let key in paramObj || {}) {
      if (
        paramObj.hasOwnProperty(key) &&
        CommonUtility.isNotEmpty(paramObj[key]) &&
        typeof paramObj[key] !== 'object'
      ) {
        params.set(key, paramObj[key]);
      }
    }
    return params;
  }

  static convertObjectToUrlEncoded(paramObj: object) {
    let params = new HttpParams();
    for (let key in paramObj) {
      if (paramObj.hasOwnProperty(key) && paramObj[key]) {
        params = params.append(key, paramObj[key]);
      }
    }
    return params;
  }

  static getParameter(paramName) {
    var searchString = window.location.search.substring(1),
      i,
      val,
      params = searchString.split('&');

    for (i = 0; i < params.length; i++) {
      val = params[i].split('=');
      if (val[0] == paramName) {
        return val[1];
      }
    }
    return null;
  }

  static isNumber(n): boolean {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
}
