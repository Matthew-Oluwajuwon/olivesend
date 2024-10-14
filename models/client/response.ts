export class API<T> {
  responseCode: string = "";
  responseMessage: string = "";
  message: string = "";
  data: T | undefined;
}

export class Countries {
  id: number = 0;
  name: string = "";
  countryCode: string = "";
  countryFlag: string = "";
  countryPhoneLength: number = 0;
  shortCode: string = "";
  currency: string = "";
  currencySymbol: string = "";
}
