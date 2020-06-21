export interface SelectData {
  value: number;
  viewValue: string;
  disable: boolean;
}

export class SelectDataImpl implements SelectData {
  value: number;
  viewValue: string;
  disable: boolean;

  constructor(value: number, viewValue: string, disable: boolean) {
    this.value = value;
    this.viewValue = viewValue;
    this.disable = disable;
  }

}
