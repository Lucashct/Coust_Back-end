import { StatusResponse } from "../enums/StatusResponse";

export class ResponseObject {
  status: StatusResponse;
  message: string;
  list: Array<any> | null;
  item: Object | null;

  constructor(status: StatusResponse, message: string, list: Array<any> | null, item: Object | null) {
    this.status = status;
    this.message = message;
    this.list = list;
    this.item = item
  }
}