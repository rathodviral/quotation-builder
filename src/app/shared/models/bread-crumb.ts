export class BreadCrumb {
  name: string;
  link: string[];

  constructor(name: string, link: string[]) {
    this.name = name;
    this.link = link;
  }
}
