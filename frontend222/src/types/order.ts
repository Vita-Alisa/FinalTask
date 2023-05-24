import IProduct from "./product";
import IUser from "./user";

export default interface IOrder {
    id?: any | null,
    number?: string | null,
    product?: IProduct | null,
    person?: IUser | null,
    count: number,
    price: number,
    dateTime: Date,
    status: string,
}

export interface IUpdateOrderStatusRequest {
    status: string,
}

export interface ISearchOrderRequest {
    search: string,
}