export class API<T> {
  responseCode: string = "";
  responseMessage: string = "";
  message: string = "";
  data: T | undefined;
}
