import IProduct from "./product";

export default interface IImage {
    id?: any | null,
    fileName: string,
    product: IProduct
}