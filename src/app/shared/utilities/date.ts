import * as moment from 'moment';

export class DateUtility {
  static stringToDate(date: string, format: string = 'YYYY-MM-DD'): Date {
    if (!date) {
      return null;
    }
    return moment(date, format).toDate();
  }

  static dateToString(date: Date, format: string = 'YYYY-MM-DD'): string {
    return moment(date).format(format);
  }

  //   static getMonths(): any[] {
  //     return Array.apply(0, Array(12)).map((_, i) => {
  //       return {
  //         id: moment().month(i).format('MM'),
  //         text: moment().month(i).format('MMMM'),
  //       };
  //     });
  //   }

  //   static dateLarger(date1: Date, date2: Date): boolean {
  //     return new Date(date1) > new Date(date2);
  //   }

  static addMonths(date: Date, month: number): Date {
    return moment(date).add(month, 'month').toDate();
  }

  static addDays(date: Date, days: number): Date {
    return moment(date).add(days, 'days').toDate();
  }

  //   static startAndEndDate(month: number): Date[] {
  //     let date = new Date().setMonth(month);
  //     const startOfMonth = moment(date).startOf('month').toDate();
  //     const endOfMonth = moment(date).endOf('month').toDate();
  //     return [startOfMonth, endOfMonth];
  //   }

  //   static serverTimeToApp(time: string, serverFormat: string = CommonConstant.serverTimeFormat, format: string = 'HH:mm'): string {
  //     return moment(time, serverFormat).format(format);
  //   }

  //   static appTimeToServer(time: string, clientFormat: string = 'HH:mm', format: string = CommonConstant.serverTimeFormat): string {
  //     return moment(time, clientFormat).format(format);
  //   }
}
