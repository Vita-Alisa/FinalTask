import axios from 'axios';
import authHeader from './auth-header';
import IUser, {IUpdateUserRole} from "../types/user"
import IProduct, { ISearchProductRequest, IEditProductRequest, IAddProductRequest} from "../types/product"
import ICategory from '../types/category';

const API_URL = 'http://localhost:8080/admin';

//связанные с пользователями:
const adminUsers = () => {
    return axios.get<IUser[]>(API_URL + '/users', { headers: authHeader() });
};

const editUserRole = (id: any, role: IUpdateUserRole) => {
    return axios.post<IUser>(API_URL + `/users/edit/${id}`, role, { headers: authHeader() });
};

//связанные с продуктами:
const addProductPost = (data: IAddProductRequest) => {
    return axios.post<IProduct>(API_URL + '/product/add', data, { headers: authHeader() });
};

const infoProduct = (id: any) => {
    return axios.get<IProduct>(API_URL + `/product/info/${id}`, { headers: authHeader() });
};

const deleteProduct = (id: any) => {
    return axios.get<IProduct>(API_URL + `/product/delete/${id}`, { headers: authHeader() });
};

const admin = () => {
    return axios.get<IProduct[]>(API_URL, { headers: authHeader() });
};

const productSearch = (data: ISearchProductRequest) => {
    return axios.post<IProduct[]>(API_URL + '/product/search', data, { headers: authHeader() });
};

//связанные с категориями:
const categories = () => {
    return axios.get<ICategory[]>(API_URL + '/category');
};

const AdminService = {
    addProductPost,
    infoProduct,
    deleteProduct,
    categories,
    adminUsers,
    editUserRole,
    admin,
    productSearch,
};

export default AdminService;