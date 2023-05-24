import axios from 'axios';
import authHeader from './auth-header';
import ICart from "../types/cart";

const API_URL = 'http://localhost:8080/';

const deleteProductFromCart = (id: any) => {//передаем id именно записи в таблице
    return axios.get<ICart>(API_URL + `cart/delete/${id}`, { headers: authHeader() });
};

const cart = () => {
    return axios.get<ICart[]>(API_URL + 'cart', { headers: authHeader() });
};

const addProductInCart = (id: any) => {//передаем id товара
    return axios.get<ICart>(API_URL + `cart/add/${id}`, { headers: authHeader() });
};

const BasketService = {
    deleteProductFromCart,
    cart,
    addProductInCart,
};

export default BasketService;