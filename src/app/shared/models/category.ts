export class Category {
  id: string;
  name: string;
  detail: string;
  isExpense: boolean;
  isActive?: boolean;
  subCategory: SubCategory[];
}
export class SubCategory {
  id: string;
  categoryId: string;
  name: string;
  detail: string;
  isExpense: boolean;
  isActive?: boolean;
}
