import axios from 'axios';
import authHeader from './auth-header';
import IProduct, { ISearchProductRequest, IEditProductRequest } from "../types/product"

const API_URL = 'http://localhost:8080/person account';

//связанные с продуктами:
const index = () => {
    return axios.get<IProduct[]>(API_URL, { headers: authHeader() });
};

const infoProduct = (id: any) => {
    return axios.get<IProduct>(API_URL + `/product/info/${id}`, { headers: authHeader() });
};

const productSearch = (data: ISearchProductRequest) => {
    return axios.post<IProduct[]>(API_URL + 'product/search', data, { headers: authHeader() });
};

const AdminService = {
    index,
    infoProduct,
    productSearch,
};

export default AdminService;