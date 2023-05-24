import IImage from "./image";

export default interface IProduct {
    id?: any | null,
    title: string,
    description: string,
    price: number,
    warehouse: string,
    seller: string,
    category: string,
    dateTime: Date | null,
    imageList: IImage[] | null,
}

export interface IProductInBasket {
    id?: any | null,
    productId: number,
    title: string,
    price: number,
    imageList: IImage[],
    description: string,
}

export interface ISearchProductRequest {
    search: string,
    otPrice: string,
    doPrice: string,
    price: string,
    contract: string,
}

export interface IEditProductRequest {
    title: string,
    description: string,
    warehouse: string,
    seller: string,
    file_one?: File,
    file_two?: File,
    file_three?: File,
    file_four?: File,
    file_five?: File,
    categoryId: number,
    price: number,
}

export interface IAddProductRequest {
    title: string,
    description: string,
    warehouse: string,
    seller: string,
    file_one?: File,
    file_two?: File,
    file_three?: File,
    file_four?: File,
    file_five?: File,
    categoryId: number,
    price: number,
}

export interface IAddProductNoFileRequest {
    title: string,
    description: string,
    warehouse: string,
    seller: string,
    categoryId: number,
    price: number,
}

export interface IProductInfoResponse {
    id?: any | null,
    title: string,
    description: string,
    price: number,
    warehouse: string,
    seller: string,
    category: string,
    dateTime: Date,
    images?: IImage[] | null,
}
