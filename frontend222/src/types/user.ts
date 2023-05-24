import IOrder from "./order";
import IProduct from "./product";

export default interface IUser {
  id?: any | null,
  login: string,
  password: string,
  role: string,
  productList: IProduct[] | null,
  orderList: IOrder[] | null
}

export interface IUserInfo {
  id: number,
  login: string,
  role: string,
}

export interface IUpdateUserRole {
  role: string,
}