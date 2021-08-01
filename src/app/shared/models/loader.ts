export class Loader {
    title: string;
    isShow: boolean;

    constructor(isShow: boolean, title?: string) {
        this.isShow = isShow;
        this.title = title || null;
    }
}