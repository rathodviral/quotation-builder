export class LocalStorageUtility {
  static getData(name: string): any {
    const data = localStorage.getItem(name);
    return data ? JSON.parse(data) : null;
  }

  static setData(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  static removeData(name?: string) {
    if (name) {
      localStorage.removeItem(name);
    } else {
      localStorage.clear();
    }
  }
}
