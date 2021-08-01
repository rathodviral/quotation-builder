export class Alert {
  type: 'success' | 'danger' | 'warning';
  text: string;
  isShow: boolean;

  constructor(
    type: 'success' | 'danger' | 'warning',
    text?: string,
    isShow?: boolean
  ) {
    this.type = type || 'success';
    this.text = text || null;
    this.isShow = isShow || true;
  }
}
