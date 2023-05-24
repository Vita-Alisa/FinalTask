import { IProductInBasket } from "./product";

export default interface ICart {
    id?: any | null,
    personId: number,
    product: IProductInBasket,
}