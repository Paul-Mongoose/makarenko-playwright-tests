export interface ILoginBody {
  email: string;
  password: string;
}

export interface IResponse {
  status: number;
  body: object;
  url: string;
  headers: { [key: string]: string };
}

export interface IUserResponseData {
  id: number;
  name: string;
  email: string;
  hasPasswordExist: boolean;
  surname?: string;
}
