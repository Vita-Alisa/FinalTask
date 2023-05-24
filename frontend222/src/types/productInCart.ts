import ICategory from "./category";
import IImage from "./image";

export default interface IProductInCart {
    id?: any | null,
    productInCardId: number,
    title: string,
    description: string,
    price: number,
    warehouse: string,
    seller: string,
    category: ICategory,
    dateTime: Date,
    imageList: IImage[] | null
}