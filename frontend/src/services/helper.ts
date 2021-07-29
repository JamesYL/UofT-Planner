import { AxiosResponse } from "axios";
export interface ErrorData {
  message: string;
}
class BadAxiosResponseError extends Error {
  private response;
  constructor(response: AxiosResponse<ErrorData>) {
    super(response.data.message);
    console.error(response.data.message);
    this.response = response;
  }
  getResponse() {
    return this.response;
  }
}
export default BadAxiosResponseError;
